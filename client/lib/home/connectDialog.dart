import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../data/cardDecks.dart';
import '../game/multiplayerOnlineV2.dart';
import '../services/realtime/realtime_handler.dart';
import '../services/realtime/websocket_handler.dart';
import '../game/playerInfo.dart';
import '../gameCard/cards.dart';
import '../home/multiPlayerDialogOnline.dart';
import '../app.dart';

class ConnectDialog extends StatefulWidget {
  const ConnectDialog({super.key});

  @override
  _ConnectDialog createState() => _ConnectDialog();
}

class _ConnectDialog extends State<ConnectDialog> {
  RealtimeHandler realtimeHandler = WebSocketHandler();
  String statusMessage = tr('connecting');
  String errorMessage = '';
  List<Player> players = [];
  bool isStartButtonEnabled = false;

  @override
  void initState() {
    super.initState();
    if (!App.gameCode.startsWith('${App.selectedCardDeck}') &&
        App.gameCode.isNotEmpty) {
      errorMessage = tr('wrongCardDeck');
      return;
    }

    realtimeHandler.listenForMessages((message) {
      if (message.startsWith('CREATE_GAME_SUCCESS:')) {
        setState(() {
          App.gameCode = message.split(':')[1];
          statusMessage = tr('waitingForPlayers');
          players.add(Player(name: App.username, isTurn: true));
        });
      } else if (message.startsWith('JOIN_GAME_SUCCESS')) {
        List<String> usernames = message.split(':').sublist(1);
        setState(() {
          statusMessage = tr('waitingForName', args: [usernames[0]]);
          for (String username in usernames) {
            players.add(Player(name: username));
          }
        });
      } else if (message.startsWith('NEW_USER_JOINED:')) {
        setState(() {
          players.add(Player(name: message.split(':')[1]));
        });
      } else if (message.startsWith('START_GAME_SUCCESS:')) {
        List<int> cardIDs =
            message.split(':')[1].split(',').map(int.parse).toList();
        for (Player player in players) {
          player.numberOfCards = cardIDs.length;
        }
        List<GameCard> gameCardList = cardIDs.map((id) {
          return cardDecks[App.selectedCardDeck]
              .cards
              .firstWhere((gameCard) => gameCard.id == id);
        }).toList();

        return Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => MultiPlayerOnlineV2(
                    players: players,
                    stackUser: gameCardList,
                    realtimeHandler: realtimeHandler)));
      } else if (message.startsWith('ERROR:')) {
        setState(() {
          errorMessage = message.split(':')[1];
        });
      }
    });

    if (App.gameCode == '') {
      isStartButtonEnabled = true;
      realtimeHandler
          .send('CREATE_GAME:${App.username}:${App.selectedCardDeck}');
    } else {
      isStartButtonEnabled = false;
      realtimeHandler.send('JOIN_GAME:${App.gameCode}:${App.username}');
    }
  }

  void _startGame() {
    List<int> cardIDs = List<int>.generate(
        cardDecks[App.selectedCardDeck].cards.length, (index) => index + 1);
    cardIDs.shuffle();
    int numberOfCards;
    if (players.length == 2) {
      numberOfCards = 15;
    } else if (players.length == 3) {
      numberOfCards = 10;
    } else {
      numberOfCards = 7;
    }
    String message = 'START_GAME';

    for (int i = 0; i < players.length; i++) {
      message += ':';
      int startIndex = i * numberOfCards;
      int endIndex = startIndex + numberOfCards;
      message += cardIDs.sublist(startIndex, endIndex).join(',');
    }

    realtimeHandler.send(message);
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      scrollable: true,
      actionsPadding: const EdgeInsets.fromLTRB(20, 10, 20, 20),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      content: Container(
          constraints: const BoxConstraints(maxWidth: 350),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 30),
              Text(
                App.gameCode.isNotEmpty ? App.gameCode : '...',
                style:
                    const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 20),
              errorMessage.isEmpty
                  ? Column(
                      children: [
                        const CupertinoActivityIndicator(),
                        const SizedBox(height: 20),
                        Text(statusMessage),
                        Container(
                          margin: const EdgeInsets.only(top: 20),
                          padding: const EdgeInsets.fromLTRB(20, 20, 20, 20),
                          decoration: BoxDecoration(
                              color: Colors.black12,
                              borderRadius: BorderRadius.circular(10)),
                          child: Column(
                            children: [
                              Text(tr('connectedPlayers')),
                              const SizedBox(height: 10),
                              for (Player player in players)
                                Padding(
                                    padding: const EdgeInsets.only(bottom: 5),
                                    child: Row(
                                      mainAxisSize: MainAxisSize.min,
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Icon(
                                          Icons.person,
                                          color: Theme.of(context)
                                              .colorScheme
                                              .primary,
                                          size: 20,
                                        ),
                                        const SizedBox(width: 5),
                                        Text(player.name,
                                            style: TextStyle(
                                                fontWeight: FontWeight.bold,
                                                color: Theme.of(context)
                                                    .colorScheme
                                                    .primary)),
                                      ],
                                    ))
                            ],
                          ),
                        ),
                      ],
                    )
                  : Text(errorMessage,
                      textAlign: TextAlign.center,
                      style: const TextStyle(color: Colors.red)),
              const SizedBox(height: 10),
            ],
          )),
      actions: <Widget>[
        MaterialButton(
          height: 40,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8.0),
          ),
          child: Text(tr('back').toUpperCase()),
          onPressed: () {
            Navigator.of(context).pop();
            showDialog(
                context: context,
                builder: (_) {
                  return const MultiPlayerDialogOnline();
                });
          },
        ),
        isStartButtonEnabled
            ? MaterialButton(
                height: 40,
                color: Theme.of(context).colorScheme.primary,
                disabledColor: Colors.grey,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8.0),
                ),
                onPressed: players.length > 1
                    ? () {
                        _startGame();
                        setState(() {
                          statusMessage = tr('startingGame');
                        });
                      }
                    : null,
                child: Row(mainAxisSize: MainAxisSize.min, children: [
                  Text(tr('play').toUpperCase(),
                      style: const TextStyle(color: Colors.white)),
                  const Icon(
                    Icons.play_arrow_rounded,
                    color: Colors.white,
                  )
                ]),
              )
            : const SizedBox(width: 0, height: 0)
      ],
    );
  }

  @override
  void dispose() {
    realtimeHandler.close();
    super.dispose();
  }
}
