import 'dart:async';
import 'package:trump_cards/services/realtime/realtime_handler.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

class WebSocketHandler implements RealtimeHandler {
  WebSocketChannel? _webSocketChannel;
  StreamController<String>? _streamController;

  WebSocketHandler() {
    _webSocketChannel = WebSocketChannel.connect(Uri.parse(
        const String.fromEnvironment("WS_URL",
            defaultValue: 'wss://seahorse-app-8ozgk.ondigitalocean.app')));
    // defaultValue: 'ws://localhost:8080')));
  }

  @override
  void close() {
    _webSocketChannel!.sink.close();
    if (_streamController != null) _streamController!.close();
  }

  @override
  void send(String message) {
    _webSocketChannel!.sink.add(message);
  }

  @override
  void listenForMessages(Function(String) onMessageReceived) {
    if (_streamController != null) {
      _streamController!.stream.listen((message) {
        onMessageReceived(message);
      });
    } else {
      _streamController = StreamController<String>.broadcast();
      _webSocketChannel!.stream.listen((message) {
        _streamController!.add(message);
      });
      _streamController!.stream.listen((message) {
        onMessageReceived(message);
      });
    }
  }
}
