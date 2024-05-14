import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:trump_cards/data/cardDecks.dart';
import 'package:trump_cards/game/messageList.dart';
import 'package:trump_cards/gameCard/gameCardWidget.dart';
import 'package:trump_cards/services/realtime/realtime_handler.dart';

import 'gameEndedDialog.dart';
import 'playerInfo.dart';
import '../game/exitButton.dart';
import '../gameCard/animatedCardStack.dart';
import '../app.dart';
import '../gameCard/cards.dart';

class MultiPlayerOnlineV2 extends StatefulWidget {
  final RealtimeHandler realtimeHandler;
  final List<GameCard> stackUser;
  final List<Player> players;

  const MultiPlayerOnlineV2(
      {super.key,
      required this.players,
      required this.stackUser,
      required this.realtimeHandler});

  @override
  _MultiPlayerOnlineState createState() => _MultiPlayerOnlineState();
}

class _MultiPlayerOnlineState extends State<MultiPlayerOnlineV2> {
  late Player thisPlayer;
  late String playerTurn;
  bool isSendingInProgress = false;
  int points = 30;

  final GlobalKey<AnimatedCardStackState> _animatedCardStackKey =
      GlobalKey<AnimatedCardStackState>();

  final GlobalKey<MessageListState> _messageList =
      GlobalKey<MessageListState>();

  @override
  void initState() {
    super.initState();
    thisPlayer =
        widget.players.firstWhere((player) => player.name == App.username);

    playerTurn = widget.players[0].name;

    widget.realtimeHandler.listenForMessages((message) {
      if (message.startsWith('SEND_CARD_SUCCESS:')) {
        List<String> messageParts = message.split(':');
        int cardId = int.parse(messageParts[1]);
        GameCard card = cardDecks[App.selectedCardDeck]
            .cards
            .firstWhere((card) => card.id == cardId);
        Player sendFrom = widget.players
            .firstWhere((player) => player.name == messageParts[2]);
        Player sendTo = widget.players
            .firstWhere((player) => player.name == messageParts[3]);

        setState(() {
          if (sendFrom == thisPlayer && sendTo == thisPlayer) {
            // User kept card
            _animatedCardStackKey.currentState!.keepCardAnimation(() {
              widget.stackUser.add(widget.stackUser.removeAt(0));
              isSendingInProgress = false;
            });
            _messageList.currentState!.addMessage(Message(
                tr('nameKeptCard', args: [sendTo.name, card.title]),
                Colors.green));
          } else if (sendFrom == thisPlayer) {
            // User sent card to opponent
            points--;
            _animatedCardStackKey.currentState!.loseCardAnimation(() {
              if (thisPlayer.numberOfCards > 0) {
                widget.stackUser.removeAt(0);
              } else {
                showDialog(
                    barrierDismissible: false,
                    context: context,
                    builder: (_) {
                      return const GameEndedDialog(points: 0, win: false);
                    });
              }
              isSendingInProgress = false;
            });
            _messageList.currentState!.addMessage(Message(
                tr('nameReceivedCardFromName',
                    args: [sendTo.name, card.title, sendFrom.name]),
                Colors.red));
          } else if (sendTo == thisPlayer) {
            // User received card from opponent
            widget.stackUser.add(card);
            _messageList.currentState!.addMessage(Message(
                tr('nameReceivedCardFromName',
                    args: [sendTo.name, card.title, sendFrom.name]),
                Colors.green));
          } else {
            // Other player sent card to other player
            if (sendFrom == sendTo) {
              _messageList.currentState!.addMessage(Message(
                  tr('nameKeptCard', args: [sendTo.name, card.title]),
                  Theme.of(context).textTheme.bodyMedium?.color ??
                      Colors.black));
            } else {
              _messageList.currentState!.addMessage(Message(
                  tr('nameReceivedCardFromName',
                      args: [sendTo.name, card.title, sendFrom.name]),
                  Theme.of(context).textTheme.bodyMedium?.color ??
                      Colors.black));
            }
          }

          sendTo.numberOfCards++;
          sendFrom.numberOfCards--;
        });

        // check if thisPlayer is the only one with more than 0 cards
        if (widget.players.where((player) => player.numberOfCards > 0).length ==
                1 &&
            thisPlayer.numberOfCards > 0) {
          showDialog(
              barrierDismissible: false,
              context: context,
              builder: (_) {
                if (points < 1) points = 1;
                return GameEndedDialog(points: points, win: true);
              });
        }
      }

      if (message.startsWith('NEW_ROUND_STARTED:')) {
        List<String> messageParts = message.split(':');
        String roundId = messageParts[1];
        setState(() {
          playerTurn = messageParts[2];
        });
        String characteristic = messageParts[3];
        sendCharacteristic(roundId, int.parse(characteristic));
      }

      if (message.startsWith('ROUND_RESULT:')) {
        List<String> messageParts = message.split(':');
        Player winner = widget.players
            .firstWhere((player) => player.name == messageParts[2]);
        int cardId = int.parse(messageParts[3]);
        GameCard card = cardDecks[App.selectedCardDeck]
            .cards
            .firstWhere((card) => card.id == cardId);

        List<int> opponentCards = [];
        for (var i = 4; i < messageParts.length; i++) {
          opponentCards.add(int.parse(messageParts[i]));
        }

        setState(() {
          if (winner == thisPlayer) {
            // User wins and receive cards from opponents
            for (var i = 0; i < opponentCards.length; i++) {
              GameCard card = cardDecks[App.selectedCardDeck]
                  .cards
                  .firstWhere((card) => card.id == opponentCards[i]);
              widget.stackUser.add(card);
            }
            _animatedCardStackKey.currentState!.keepCardAnimation(() {
              widget.stackUser.add(widget.stackUser.removeAt(0));
              isSendingInProgress = false;
            });
            _messageList.currentState!.addMessage(Message(
                tr('playerWinWithCard', args: [winner.name, card.title]),
                Colors.green));
            thisPlayer.isTurn = true;
          } else {
            // User lose and sent card to opponent
            points--;
            thisPlayer.isTurn = false;
            _animatedCardStackKey.currentState!.loseCardAnimation(() {
              if (thisPlayer.numberOfCards > 0) {
                widget.stackUser.removeAt(0);
              } else {
                showDialog(
                    barrierDismissible: false,
                    context: context,
                    builder: (_) {
                      return const GameEndedDialog(points: 0, win: false);
                    });
              }
              isSendingInProgress = false;
            });
            _messageList.currentState!.addMessage(Message(
                tr('playerWinWithCard', args: [winner.name, card.title]),
                Colors.red));
          }

          playerTurn = winner.name;
          winner.numberOfCards++;
          for (var player in widget.players) {
            if (player != winner) player.numberOfCards--;
            player.isTurn = player == winner;
          }
        });

        // check if thisPlayer is the only one with more than 0 cards
        if (widget.players.where((player) => player.numberOfCards > 0).length ==
                1 &&
            thisPlayer.numberOfCards > 0) {
          showDialog(
              barrierDismissible: false,
              context: context,
              builder: (_) {
                if (points < 1) points = 1;
                return GameEndedDialog(points: points, win: true);
              });
        }
      }
    });
  }

  List<Widget> topRowWidget() {
    List<Widget> topRow = [];
    topRow.addAll([
      PlayerInfoWidget(
        player: thisPlayer,
        height: 75,
      ),
      const SizedBox(width: 10),
      const ExitButton(size: 75),
    ]);

    for (Player player in widget.players) {
      if (player.name != thisPlayer.name) {
        topRow.addAll([
          const SizedBox(width: 10),
          PlayerInfoWidget(
            player: player,
            height: 75,
          )
        ]);
      }
    }
    return topRow;
  }

  void onCardClicked(SelectedCharacteristic characteristic) {
    if (thisPlayer.isTurn) {
      if (isSendingInProgress) return;

      int chr;
      num value;
      switch (characteristic) {
        case SelectedCharacteristic.v1:
          chr = 1;
          value = widget.stackUser[0].value1;
          break;
        case SelectedCharacteristic.v2:
          chr = 2;
          value = widget.stackUser[0].value2;
          break;
        case SelectedCharacteristic.v3:
          chr = 3;
          value = widget.stackUser[0].value3;
          break;
        case SelectedCharacteristic.v4:
          chr = 4;
          value = widget.stackUser[0].value4;
          break;
        case SelectedCharacteristic.v5:
          chr = 5;
          value = widget.stackUser[0].value5;
          break;
        default:
          chr = 1;
          value = widget.stackUser[0].value1;
      }

      widget.realtimeHandler.send(
          'START_ROUND:${thisPlayer.name}:${widget.stackUser[0].id}:$chr:$value');
      isSendingInProgress = true;
    }
  }

  void sendCharacteristic(String roundId, int characteristic) {
    if (!thisPlayer.isTurn) {
      if (isSendingInProgress) return;

      num value;
      switch (characteristic) {
        case 1:
          value = widget.stackUser[0].value1;
          break;
        case 2:
          value = widget.stackUser[0].value2;
          break;
        case 3:
          value = widget.stackUser[0].value3;
          break;
        case 4:
          value = widget.stackUser[0].value4;
          break;
        case 5:
          value = widget.stackUser[0].value5;
          break;
        default:
          value = widget.stackUser[0].value1;
      }

      widget.realtimeHandler.send(
          'CHARACTERISTIC_SELECTED:$roundId:${thisPlayer.name}:${widget.stackUser[0].id}:$characteristic:$value');
      isSendingInProgress = true;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(
            child: Center(
                child: Stack(children: [
      Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Expanded(
                child: Container(
              constraints: const BoxConstraints(maxWidth: 500),
              margin: const EdgeInsets.all(15),
              child: Column(children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [...topRowWidget()],
                ),
                const SizedBox(height: 5),
                Text(
                  thisPlayer.isTurn
                      ? tr('yourTurn')
                      : tr('playerTurn', args: [playerTurn]),
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 20.0,
                    fontWeight: FontWeight.w400,
                  ),
                ),
                const SizedBox(height: 5),
                AnimatedCardStack(
                  key: _animatedCardStackKey,
                  cardStack: widget.stackUser,
                  isCardSelectable: thisPlayer.isTurn,
                  onCardClicked: onCardClicked,
                ),
                const SizedBox(height: 10),
              ]),
            ))
          ],
        ),
      ),
      IgnorePointer(
        child: MessageList(key: _messageList),
      ),
    ]))));
  }
}
