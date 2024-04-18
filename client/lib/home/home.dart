import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';

import 'appBar.dart';
import 'multiPlayerDialog.dart';
import '../home/singlePlayerDialog.dart';
import '../app.dart';
import '../data/cardDecks.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  static const routeName = '/';

  @override
  HomeState createState() => HomeState();
}

class HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Theme.of(context).colorScheme.primary,
          title: const MyAppBar(),
        ),
        body: Container(
            width: double.infinity,
            decoration: BoxDecoration(
                image: DecorationImage(
                    image: AssetImage(
                        'assets/images/${cardDecks[App.selectedCardDeck].name}/background.jpg'),
                    fit: BoxFit.cover)),
            child: CustomScrollView(scrollDirection: Axis.vertical, slivers: [
              SliverFillRemaining(
                  hasScrollBody: false,
                  child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        const Column(
                          children: [
                            Image(
                                image: AssetImage(
                                    'assets/images/trump-cards-logo-shadow.png'),
                                height: 190),
                            SizedBox(height: 20),
                          ],
                        ),
                        Column(
                          children: [
                            // singleplayer button
                            MaterialButton(
                              color: Colors.blue,
                              height: 65,
                              minWidth: 300,
                              elevation: 10,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10.0),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  const Icon(Icons.person, color: Colors.white),
                                  const SizedBox(
                                    width: 10,
                                  ),
                                  Text(
                                    tr('singleplayer'),
                                    style: const TextStyle(
                                        color: Colors.white,
                                        fontSize: 16,
                                        fontWeight: FontWeight.bold),
                                  )
                                ],
                              ),
                              onPressed: () {
                                showDialog(
                                    context: context,
                                    builder: (_) {
                                      return const SinglePlayerDialog();
                                    });
                              },
                            ),
                            const SizedBox(height: 12),
                            // multiplayer button
                            MaterialButton(
                              color: Colors.blue,
                              height: 65,
                              minWidth: 300,
                              elevation: 10,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10.0),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  const Icon(
                                    Icons.group_add_rounded,
                                    color: Colors.white,
                                  ),
                                  const SizedBox(
                                    width: 10,
                                  ),
                                  Text(
                                    tr('multiplayer'),
                                    style: const TextStyle(
                                        color: Colors.white,
                                        fontSize: 16,
                                        fontWeight: FontWeight.bold),
                                  )
                                ],
                              ),
                              onPressed: () {
                                showDialog(
                                    context: context,
                                    builder: (_) {
                                      return const MultiPlayerDialog();
                                    });
                              },
                            ),
                            const SizedBox(height: 12),
                            // view cards button
                            MaterialButton(
                              color: Colors.blue,
                              height: 65,
                              minWidth: 300,
                              elevation: 10,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10.0),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  const RotatedBox(
                                      quarterTurns: 2,
                                      child: Icon(Icons.style,
                                          color: Colors.white)),
                                  const SizedBox(
                                    width: 10,
                                  ),
                                  Text(
                                    tr('viewCards'),
                                    style: const TextStyle(
                                        color: Colors.white,
                                        fontSize: 16,
                                        fontWeight: FontWeight.bold),
                                  )
                                ],
                              ),
                              onPressed: () {
                                Navigator.pushNamed(context, '/view-cards');
                              },
                            ),
                            const SizedBox(height: 10),
                          ],
                        )
                      ]))
            ])));
  }
}
