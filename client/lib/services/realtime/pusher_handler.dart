// import 'dart:async';

// import 'package:trump_cards/services/realtime/realtime_handler.dart';
// import 'package:pusher_channels_flutter/pusher_channels_flutter.dart';

// class PusherHandler implements RealtimeHandler {
//   final String appId = "1788584";
//   final String apiKey = "825217076a72da835eaf";
//   final String secret = "948e43fd3aba5ec808d6";
//   final String apiCluster = "us2";
//   PusherChannelsFlutter? _pusher;
//   PusherChannel? _myChannel;
//   StreamController<String>? _streamController;

//   PusherHandler() {
//     _pusher = PusherChannelsFlutter.getInstance();
//     init();
//   }

//   void init() async {
//     await _pusher!.init(apiKey: apiKey, cluster: apiCluster, onEvent: onEvent);
//     _myChannel = await _pusher!.subscribe(channelName: "my-channel");
//     await _pusher!.connect();
//   }

//   void onEvent(PusherEvent event) {
//     print("onEvent: $event");
//     if (_streamController != null) {
//       _streamController!.add(event.data['message'] ?? '');
//     }
//   }

//   @override
//   void close() {
//     _pusher!.disconnect();
//     if (_streamController != null) _streamController!.close();
//   }

//   @override
//   void listenForMessages(Function(String p1) onMessageReceived) async {
//     if (_streamController != null) {
//       _streamController!.stream.listen((message) {
//         onMessageReceived(message);
//       });
//     } else {
//       _streamController = StreamController<String>.broadcast();
//       _streamController!.stream.listen((message) {
//         onMessageReceived(message);
//       });
//     }
//   }

//   @override
//   void send(String message) {
//     _pusher!.trigger(PusherEvent(
//         channelName: "my-channel", eventName: "my-event", data: message));
//   }
// }
