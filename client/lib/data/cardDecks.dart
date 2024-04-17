import 'package:flutter/material.dart';
import 'motos.dart';

import '../gameCard/cards.dart';
import '../gameCard/measurementUnits.dart';

List<GameCardDeck> cardDecks = [
  GameCardDeck(
    'Motos',
    motos,
    const Icon(
      Icons.motorcycle,
      color: Colors.white,
    ),
    Characteristic(
        translationKey: 'power(Watt)',
        measurementType: MeasurementType.power,
        isHigherBetter: true),
    Characteristic(
        translationKey: 'topSpeed',
        measurementType: MeasurementType.speed,
        isHigherBetter: true),
    Characteristic(
        translationKey: 'weight',
        measurementType: MeasurementType.weight,
        isHigherBetter: false),
    Characteristic(
        label: '0-100 km/h',
        measurementType: MeasurementType.time,
        isHigherBetter: false),
    Characteristic(
        translationKey: 'price',
        measurementType: MeasurementType.money,
        isHigherBetter: false),
  ),
];
