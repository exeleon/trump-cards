import asyncio
import websockets
import string
import random

games = {}
counter = '0000'

motos_characteristics = [
    ('power(Watt)', True),
    ('topSpeed', True),
    ('weight', False),
    ('0-100 km/h', False),
    ('price', False),
]


def generate_new_id():
    """
    Returns an incremented 4 digit number as a string.
    """
    global counter
    if counter < '9999':
        counter = str(int(counter) + 1).zfill(4)
        return counter
    else:
        counter = '0000'
        return counter


def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
    """
    Returns a random id as a string.
    """
    return ''.join(random.choice(chars) for _ in range(size))


def get_game_code(websocket):
    """
    Returns the game code for the game that the user is in
    """
    for game_code, game in games.items():
        for _, socket in game['users']:
            if socket == websocket:
                return game_code
    return None


def remove_user(websocket):
    """
    Removes the user from the game that they are in and closes the 
    game if there are no more users.
    """
    game_code = get_game_code(websocket)
    if game_code is None:
        return

    for index, user in enumerate(games[game_code]['users']):
        if user[1] == websocket:
            del games[game_code]['users'][index]
            if len(games[game_code]['users']) == 0:
                del games[game_code]
            break


async def create_game(websocket, message):
    """
    Creates a new game and adds the user to it.
    """
    values = message.split(":")
    username = values[1]
    new_game_id = values[2] + generate_new_id()
    games[new_game_id] = {
        'users': [(username, websocket)], 'has_started': False, 'rounds': {}}
    await websocket.send('CREATE_GAME_SUCCESS:' + new_game_id)


async def join_game(websocket, message):
    """
    Lets a user with a valid game code join the game.
    """
    values = message.split(":")
    game_code = values[1]
    username = values[2]

    if game_code not in games:
        raise ValueError('Game does not exist')

    if len(games[game_code]['users']) >= 4:
        raise ValueError('Game is already full')

    if games[game_code]['has_started']:
        raise ValueError('Game has already started')

    if username in [name for name, _ in games[game_code]['users']]:
        raise ValueError('Username is already taken')

    # Add the user to the game and send a list of users back to the client
    games[game_code]['users'].append((username, websocket))
    usernames = [name for name, _ in games[game_code]['users']]
    await websocket.send('JOIN_GAME_SUCCESS:' + ':'.join(usernames))

    # Notify all users in the room that a new user has joined
    for _, socket in games[game_code]['users']:
        if socket != websocket:
            await socket.send('NEW_USER_JOINED:' + username)


async def start_game(websocket, message):
    """
    Starts the game by sending a list of card ids to each user.
    """
    values = message.split(":")
    game_code = get_game_code(websocket)

    if game_code is None:
        raise ValueError('Game code not found')

    if len(values) - 1 < len(games[game_code]['users']):
        raise ValueError('Client sent not cards for all users')

    games[game_code]['has_started'] = True

    for index, user in enumerate(games[game_code]['users']):
        cardIDs = values[index + 1]
        await user[1].send('START_GAME_SUCCESS:' + cardIDs)


async def send_card(websocket, message):
    """
    Notifies all users in the game that a card has been sent.
    """
    values = message.split(":")
    game_code = get_game_code(websocket)

    if game_code is None:
        raise ValueError('Game code not found')

    if len(values) < 4:
        raise ValueError('Invalid message format')

    for _, socket in games[game_code]['users']:
        await socket.send('SEND_CARD_SUCCESS:' + ':'.join(values[1:]))


async def start_round(websocket, message):
    """
    Receives a characteristic selection from an user starting a round.
    """
    values = message.split(":")
    player = values[1]
    card_id = values[2]
    characteristic = values[3]
    value = values[4]
    game_code = get_game_code(websocket)

    if game_code not in games:
        raise ValueError('Game does not exist')

    round_id = id_generator()
    games[game_code]['rounds'][round_id] = [(player, card_id, characteristic, value)]
    await websocket.send('START_ROUND_SUCCESS:' + round_id)

    # Notify all users in the room that a new round has started
    for _, socket in games[game_code]['users']:
        if socket != websocket:
            await socket.send('NEW_ROUND_STARTED:' + round_id + ':' + player + ':' + characteristic)


async def round_result(websocket, message):
    """
    Notifies the result of a round to all users in the game.
    """
    values = message.split(":")
    round_id = values[1]
    player = values[2]
    card_id = values[3]
    characteristic = values[4]
    value = values[5]

    game_code = get_game_code(websocket)

    if game_code is None:
        raise ValueError('Game code not found')
    
    games[game_code]['rounds'][round_id].append((player, card_id, characteristic, value))

    if len(games[game_code]['users']) <= len(games[game_code]['rounds'][round_id]):
        winner = games[game_code]['rounds'][round_id][0]
        isHigherBetter = motos_characteristics[int(characteristic) - 1][1]
        opponentCards = ''
        for card in games[game_code]['rounds'][round_id]:
            if winner[0] != card[0]:
                opponentCards = opponentCards + ':' + card[1]
            if isHigherBetter and float(card[3]) >= float(winner[3]):
                winner = card
            elif not isHigherBetter and float(card[3]) < float(winner[3]):
                winner = card

        # Notify the result to all users in the room
        for _, socket in games[game_code]['users']:
            await socket.send('ROUND_RESULT:' + round_id + ':' + winner[0] + ':' + winner[1] + opponentCards)


async def handle_connection(websocket, path):
    '''
    Handles a connection from a client.
    '''
    # Handle the initial message from the client
    try:
        message = await websocket.recv()
        if message.startswith('CREATE_GAME:'):
            await create_game(websocket, message)
        elif message.startswith('JOIN_GAME:'):
            await join_game(websocket, message)
        else:
            await ValueError('Invalid command')
    except ValueError as e:
        await websocket.send('ERROR:' + str(e))
        return

    # Handle all other messages from the client in a loop
    while True:
        try:
            message = await websocket.recv()
            if message.startswith('START_GAME:'):
                await start_game(websocket, message)
            elif message.startswith('SEND_CARD:'):
                await send_card(websocket, message)
            elif message.startswith('START_ROUND:'):
                await start_round(websocket, message)
            elif message.startswith('CHARACTERISTIC_SELECTED:'):
                await round_result(websocket, message)
            else:
                await ValueError('Invalid command')

        except ValueError as e:
            await websocket.send('ERROR:' + str(e))
            break

        except websockets.exceptions.ConnectionClosed:
            remove_user(websocket)
            break


async def main():
    async with websockets.serve(handle_connection, "0.0.0.0", 8080):
        print("Server started...")
        await asyncio.Future()  # run forever

asyncio.run(main())
