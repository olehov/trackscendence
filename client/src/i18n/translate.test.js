import assert from 'node:assert/strict'
import test from 'node:test'
import { translateToUkrainian } from './translate.js'

test('translates exact UI copy and preserves surrounding whitespace', () => {
  assert.equal(translateToUkrainian('  Loading  '), '  Завантаження  ')
})

test('translates dynamic UI copy with interpolation patterns', () => {
  assert.equal(translateToUkrainian('Player 3'), 'Гравець 3')
  assert.equal(
    translateToUkrainian('Round 2 of 3 · 8 players'),
    'Раунд 2 з 3 · 8 гравців',
  )
  assert.equal(translateToUkrainian('Taylor has 7 cards'), 'Taylor має карт: 7')
  assert.equal(translateToUkrainian('Play as red'), 'Грати червоною')
})

test('translates secondary page and accessibility copy', () => {
  assert.equal(translateToUkrainian('No conversations'), 'Немає розмов')
  assert.equal(
    translateToUkrainian('Two-factor authentication'),
    'Двофакторна автентифікація',
  )
  assert.equal(
    translateToUkrainian('Bottom play direction marker'),
    'Нижній покажчик напрямку гри',
  )
})

test('translates every waiting-room state', () => {
  assert.equal(translateToUkrainian('Waiting'), 'Очікування')
  assert.equal(
    translateToUkrainian('Need 1 more player'),
    'Потрібен ще 1 гравець',
  )
  assert.equal(
    translateToUkrainian('Need 3 more players'),
    'Потрібно ще гравців: 3',
  )
  assert.equal(translateToUkrainian('Add bots'), 'Додати ботів')
  assert.equal(translateToUkrainian('Leave Room'), 'Вийти з кімнати')
  assert.equal(
    translateToUkrainian('Starting your game…'),
    'Запускаємо вашу гру…',
  )
})

test('translates dynamic text from notifications, lobby, and game screens', () => {
  assert.equal(
    translateToUkrainian('Morgan sent a friend request'),
    'Morgan надіслав(-ла) запит у друзі',
  )
  assert.equal(
    translateToUkrainian('2 of 4 players joined'),
    'Приєдналося гравців: 2 із 4',
  )
  assert.equal(translateToUkrainian("Morgan's turn"), 'Хід гравця Morgan')
})

test('translates client-side validation messages', () => {
  assert.equal(
    translateToUkrainian('Password must be at least 8 characters'),
    'Пароль має містити щонайменше 8 символів',
  )
  assert.equal(
    translateToUkrainian('Email must not be more than 254 characters'),
    'Електронна адреса має містити не більше 254 символів',
  )
})

test('translates generated accessibility labels for cards', () => {
  assert.equal(translateToUkrainian('red number 7 card'), 'червона карта 7')
  assert.equal(
    translateToUkrainian('wild wild_draw4 card'),
    'дика карта зміна кольору, візьми чотири',
  )
})

test('leaves unknown and non-string values unchanged', () => {
  assert.equal(translateToUkrainian('Trackscendence'), 'Trackscendence')
  assert.equal(translateToUkrainian(null), null)
})
