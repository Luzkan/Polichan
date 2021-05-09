export class LabelGenerator {
  getLabel(op: boolean) {
    const UNIQUE_USER_ID_BADGE_NAMES = ['Anonymous', 'Polibudziarz', 'Doktur', 'Studenciak', 'Prowansal',
      'Szlugarz', 'Smutas', 'Haniebny', 'Sciągacz', 'Starosta', 'Ziomo', 'Frajer', 'Geniusz',
      'Biedak', 'Bogacz', 'Prymus', 'Debil', 'Imprezowicz', 'Mądrala', 'Magik', 'Pupil'];
    const UNIQUE_USER_ID_BADGE_COLORS = ['blue', 'green', 'yellow', 'purple', 'magenta', 'orange', 'pink'];

    let label = 'OP';
    let color = 'red';
    if (op) {
      return {label, color};
    } else {
      label = UNIQUE_USER_ID_BADGE_NAMES[Math.floor(Math.random() * UNIQUE_USER_ID_BADGE_NAMES.length)];
      color = UNIQUE_USER_ID_BADGE_COLORS[Math.floor(Math.random() * UNIQUE_USER_ID_BADGE_COLORS.length)];
      return {label, color};
    }
  }
}


