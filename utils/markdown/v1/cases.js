export default [
  {
    name: 'ONE WORD',
    text: 'Hello',
    expected: '<p>Hello</p>'
  },
  {
    name: 'TWO WORDS',
    text: 'Hello World',
    expected: '<p>Hello World</p>'
  },
  {
    name: 'MULTIPLE WORDS',
    text: 'Lorem ipsum sit dolor amet',
    expected: '<p>Lorem ipsum sit dolor amet</p>'
  },
  {
    name: 'EMTPY',
    text: '',
    expected: ''
  },
  {
    name: 'ONE SPACE',
    text: ' ',
    expected: '<p> </p>'
  },
  {
    name: 'TWO SPACES',
    text: '  ',
    expected: '<p>  </p>'
  },
  {
    name: 'MULTIPLE SPACES',
    text: '     ',
    expected: '<p>     </p>'
  },
  {
    name: 'ONE TAB',
    text: '\t',
    expected: '<p>\t</p>'
  },
  {
    name: 'TWO TABS',
    text: '\t\t',
    expected: '<p>\t\t</p>'
  },
  {
    name: 'MULTIPLE TABS',
    text: '\t\t\t\t\t',
    expected: '<p>\t\t\t\t\t</p>'
  },
  {
    name: 'ONE NEWLINE',
    text: `\n`,
    expected: '<br>'
  },
  {
    name: 'TWO NEWLINES',
    text: `\n\n`,
    expected: '<br><br>'
  },
  {
    name: 'MULTIPLE NEWLINES',
    text: `\n\n\n\n`,
    expected: '<br><br><br><br>'
  },
  {
    name: 'ONE WORD ONE NEWLINE',
    text: 'World\n',
    expected: '<p>World</p>'
  },
  {
    name: 'ONE WORD TWO NEWLINES',
    text: 'World\n\n',
    expected: '<p>World</p>'
  },
  {
    name: 'ONE WORD MULTIPLE NEWLINES',
    text: 'World\n\n\n\n',
    expected: '<p>World</p><br><br>'
  },
  {
    name: 'TWO WORDS ONE SPACE INBETWEEN',
    text: 'Hello World',
    expected: '<p>Hello World</p>'
  },
  {
    name: 'TWO WORDS TWO SPACES INBETWEEN',
    text: 'Hello  World',
    expected: '<p>Hello  World</p>'
  },
  {
    name: 'TWO WORDS MULTIPLE SPACES INBETWEEN',
    text: 'Hello     World',
    expected: '<p>Hello     World</p>'
  },
  {
    name: 'TWO WORDS ONE TAB INBETWEEN',
    text: 'Hello\tWorld',
    expected: '<p>Hello\tWorld</p>'
  },
  {
    name: 'TWO WORDS TWO TABS INBETWEEN',
    text: 'Hello\t\tWorld',
    expected: '<p>Hello\t\tWorld</p>'
  },
  {
    name: 'TWO WORDS MULTIPLE TABS INBETWEEN',
    text: 'Hello\t\t\t\t\tWorld',
    expected: '<p>Hello\t\t\t\t\tWorld</p>'
  },
  {
    name: 'TWO WORDS ONE NEWLINE INBETWEEN',
    text: 'Hello\nWorld',
    expected: '<p>Hello</p><p>World</p>'
  },
  {
    name: 'TWO WORDS TWO NEWLINES INBETWEEN',
    text: 'Hello\n\nWorld',
    expected: '<p>Hello</p><p>World</p>'
  },
  {
    name: 'TWO WORDS MULTIPLE NEWLINES INBETWEEN',
    text: 'Hello\n\n\n\n\nWorld',
    expected: '<p>Hello</p><br><br><br><p>World</p>'
  },
  {
    name: 'MULTIPLE WORDS ONE SPACE INBETWEEN',
    text: 'Hello World! This is the markdown',
    expected: '<p>Hello World! This is the markdown</p>'
  },
  {
    name: 'MULTIPLE WORDS TWO SPACES INBETWEEN',
    text: 'Hello  World!  This  is  the  markdown',
    expected: '<p>Hello  World!  This  is  the  markdown</p>'
  },
  {
    name: 'MULTIPLE WORDS MULTIPLE SPACES INBETWEEN',
    text: 'Hello     World!     This     is     the     markdown',
    expected: '<p>Hello     World!     This     is     the     markdown</p>'
  },
  {
    name: 'MULTIPLE WORDS ONE TAB INBETWEEN',
    text: 'Hello\tWorld!\tThis\tis\tthe\tmarkdown',
    expected: '<p>Hello\tWorld!\tThis\tis\tthe\tmarkdown</p>'
  },
  {
    name: 'MULTIPLE WORDS TWO TABS INBETWEEN',
    text: 'Hello\t\tWorld!\t\tThis\t\tis\t\tthe\t\tmarkdown',
    expected: '<p>Hello\t\tWorld!\t\tThis\t\tis\t\tthe\t\tmarkdown</p>'
  },
  {
    name: 'MULTIPLE WORDS MULTIPLE TABS INBETWEEN',
    text: 'Hello\t\t\t\t\tWorld!\t\t\t\t\tThis\t\t\t\t\tis\t\t\t\t\tthe\t\t\t\t\tmarkdown',
    expected: '<p>Hello\t\t\t\t\tWorld!\t\t\t\t\tThis\t\t\t\t\tis\t\t\t\t\tthe\t\t\t\t\tmarkdown</p>'
  },
  {
    name: 'MULTIPLE WORDS ONE NEWLINE INBETWEEN',
    text: 'Hello\nWorld!\nThis\nis\nthe\nmarkdown',
    expected: '<p>Hello</p><p>World!</p><p>This</p><p>is</p><p>the</p><p>markdown</p>'
  },
  {
    name: 'MULTIPLE WORDS TWO NEWLINES INBETWEEN',
    text: 'Hello\n\nWorld!\n\nThis\n\nis\n\nthe\n\nmarkdown',
    expected: '<p>Hello</p><p>World!</p><p>This</p><p>is</p><p>the</p><p>markdown</p>'
  },
  {
    name: 'MULTIPLE WORDS MULTIPLE NEWLINES INBETWEEN',
    text: 'Hello\n\n\n\n\nWorld!\n\n\n\n\nThis\n\n\n\n\nis\n\n\n\n\nthe\n\n\n\n\nmarkdown',
    expected: '<p>Hello</p><br><br><br><p>World!</p><br><br><br><p>This</p><br><br><br><p>is</p><br><br><br><p>the</p><br><br><br><p>markdown</p>'
  },
  {
    name: 'SYMBOLS',
    text: '+×÷=/<>[]!@#$%^&()-\'":;,?`~\\|{}€£¥₩°•○●□■♤♡◇♧☆▪︎¤《》¡¿',
    expected: '<p>+×÷=/<>[]!@#$%^&()-\'":;,?`~\\|{}€£¥₩°•○●□■♤♡◇♧☆▪︎¤《》¡¿</p>'
  },
  {
    name: 'SYMBOLS WITH UNDERSCORE STAR DASHSPACE',
    text: '+×÷=/<>[]!_@#$%^*&()-\'":;- ,?`~\\|{}€£¥₩°•○●□■♤♡◇♧☆▪︎¤《》¡¿',
    expected: '<p>+×÷=/<>[]!_@#$%^*&()-\'":;- ,?`~\\|{}€£¥₩°•○●□■♤♡◇♧☆▪︎¤《》¡¿</p>'
  },
  {
    name: 'SYMBOLS WITH TWO UNDERSCORES TWO STARS TWO DASHSPACES',
    text: '+×÷=/<>[]!__@#$%^**&()-\'":;- - ,?`~\\|{}€£¥₩°•○●□■♤♡◇♧☆▪︎¤《》¡¿',
    expected: '<p>+×÷=/<>[]!__@#$%^**&()-\'":;- - ,?`~\\|{}€£¥₩°•○●□■♤♡◇♧☆▪︎¤《》¡¿</p>'
  },
  {
    name: 'SYMBOLS WITH FOUR UNDERSCORES FOUR STARS TWO DASHSPACES',
    text: '+×÷=/<>[]!____@#$%^****&()-\'":;- - ,?`~\\|{}€£¥₩°•○●□■♤♡◇♧☆▪︎¤《》¡¿',
    expected: '<p>+×÷=/<>[]!____@#$%^****&()-\'":;- - ,?`~\\|{}€£¥₩°•○●□■♤♡◇♧☆▪︎¤《》¡¿</p>'
  },
  {
    name: 'SYMBOLS WITH VALID ITALIC VALID BOLD TWO DASHSPACES',
    text: '+×÷=/<>[]!__@#$__%^**&()-\'**":;- - ,?`~\\|{}€£¥₩°•○●□■♤♡◇♧☆▪︎¤《》¡¿',
    expected: '<p>+×÷=/<>[]!<i>@#$</i>%^<b>&()-\'</b>":;- - ,?`~\\|{}€£¥₩°•○●□■♤♡◇♧☆▪︎¤《》¡¿</p>'
  },
  {
    name: 'ONE PARAGRAPH',
    text: 'Lorem ipsum sit dolor amet',
    expected: '<p>Lorem ipsum sit dolor amet</p>'
  },
  {
    name: 'ONE NEWLINE ONE PARAGRAPH',
    text: '\nLorem ipsum sit dolor amet',
    expected: '<br><p>Lorem ipsum sit dolor amet</p>'
  },
  {
    name: 'TWO NEWLINES ONE PARAGRAPH',
    text: '\n\nLorem ipsum sit dolor amet',
    expected: '<br><br><p>Lorem ipsum sit dolor amet</p>'
  },
  {
    name: 'MULTIPLE NEWLINES ONE PARAGRAPH',
    text: '\n\n\n\n\nLorem ipsum sit dolor amet',
    expected: '<br><br><br><br><br><p>Lorem ipsum sit dolor amet</p>'
  },
]