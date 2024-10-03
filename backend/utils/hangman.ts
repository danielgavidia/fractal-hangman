export const hangmanStages: string[] = [
	// 0: empty
	`
  +---+
  |   |
      |
      |
      |
      |
=========`,

	// 1: head
	`
  +---+
  |   |
  O   |
      |
      |
      |
=========`,

	// 2: head and torso
	`
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,

	// 3: head, torso, and one arm
	`
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,

	// 4: head, torso, and both arms
	`
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,

	// 5: head, torso, both arms, and one leg
	`
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,

	// 6: full body (game over)
	`
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`,
];
