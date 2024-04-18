FROM python:3.10-slim

WORKDIR /app
COPY . /app

RUN pip install websockets

EXPOSE 8080

CMD ["python", "server.py"]