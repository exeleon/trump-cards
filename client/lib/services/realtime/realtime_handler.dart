abstract class RealtimeHandler {
  void close();
  void send(String message);
  void listenForMessages(Function(String) onMessageReceived);
}
