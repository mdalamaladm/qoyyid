module.exports =
[
  {
    name: '1 DELETE',
    old: 'One Two Three Four',
    current: 'One Two Four',
    expected: 'One Two <Three> Four'
  },
  {
    name: '2 DELETE',
    old: 'One Two Three Four',
    current: 'Two Four',
    expected: '<One> Two <Three> Four'
  },
  {
    name: '3 DELETE',
    old: 'One Two Three Four',
    current: 'Two',
    expected: '<One> Two <Three> <Four>'
  },
  {
    name: 'DELETE ALL',
    old: 'One Two Three Four',
    current: '',
    expected: '<One> <Two> <Three> <Four>'
  },
  {
    name: '1 INSERT',
    old: 'One Two',
    current: 'One Two Three',
    expected: 'One Two (Three)'
  },
  {
    name: '2 INSERT',
    old: 'One Two',
    current: 'Four One Two Three',
    expected: '(Four) One Two (Three)'
  },
  {
    name: '3 INSERT',
    old: 'One Two',
    current: 'Four One Five Two Three',
    expected: '(Four) One (Five) Two (Three)'
  },
  {
    name: 'INSERT FROM EMPTY',
    old: '',
    current: 'One Two Three Four Five',
    expected: '(One) (Two) (Three) (Four) (Five)'
  },
  {
    name: '1 ALTER',
    old: 'One Two Three Four',
    current: 'One Two Three Five',
    expected: 'One Two Three [Four => Five]'
  },
  {
    name: '2 ALTER',
    old: 'One Two Three Four',
    current: 'One Seven Three Five',
    expected: 'One [Two => Seven] Three [Four => Five]'
  },
  {
    name: '3 ALTER',
    old: 'One Two Three Four',
    current: 'Six Seven Three Five',
    expected: '[One => Six] [Two => Seven] Three [Four => Five]'
  },
  {
    name: 'ALTER ALL',
    old: 'One Two Three Four',
    current: 'Five Six Seven Eight',
    expected: '[One => Five] [Two => Six] [Three => Seven] [Four => Eight]'
  },
  {
    name: '1 DELETE, 1 INSERT',
    old: 'One Two Three Four',
    current: 'One Three Four Five',
    expected: 'One <Two> Three Four (Five)'
  },
  {
    name: 'ALTER ALL, 3 INSERT',
    old: 'One Two Three Four',
    current: 'Nine Ten Five Six Seven Eight Eleven',
    expected: '[One => Nine] [Two => Ten] [Three => Five] [Four => Six] (Seven) (Eight) (Eleven)'
  },
  {
    name: 'TWO WORDS WITHOUT SPACE',
    old: 'One Two',
    current: 'OneTwo',
    expected: '[One => OneTwo] <Two>'
  },
  {
    name: 'REVERSED WORD',
    old: 'One Two',
    current: 'Two One',
    expected: '(Two) One <Two>'
  },
  {
    name: '2 SPACES',
    old: 'One Two',
    current: 'One Two',
    expected: 'One Two'
  },
  {
    name: 'LONG SPACE',
    old: 'One Two',
    current: 'One      Two',
    expected: 'One Two'
  },
  {
    name: 'MULTILINE SPACE',
    old: 'One Two',
    current: `One
    Two`,
    expected: 'One Two'
  },
  {
    name: 'REMOVE MULTILINE LIST',
    old: `
    This list must be done by today:
    • Cleaning the kitchen
    • Prepare the ingredients for tomorrow
    • Feed The Boss's Cat
    `,
    current: `
    This list must be done by today:
    • Cleaning the kitchen
    • Prepare the ingredients for tomorrow
    `,
    expected: `This list must be done by today: • Cleaning the kitchen • Prepare the ingredients for tomorrow <•> <Feed> <The> <Boss's> <Cat>`
  },
  {
    name: 'STRIKETROUGH',
    old: 'The dog eats my food',
    current: 'The dog eats m\u0336y\u0336 your food',
    expected: 'The dog eats (m\u0336y\u0336) [my => your] food'
  },
  {
    name: 'INSERT SYMBOLS',
    old: '',
    current: '@&# ^@\\ %■ ☆',
    expected: '(@&#) (^@\\) (%■) (☆)'
  },
  {
    name: 'ALTER SYMBOLS',
    old: '@% 》《{}',
    current: '%% <<< /=÷ :; ■●',
    expected: '[@% => %%] [》《{} => <<<] (/=÷) (:;) (■●)'
  },
  {
    name: '1 ALTER SYMBOL, 1 INSERT SYMBOL',
    old: '£♤¤ 》》■',
    current: '€♤¤ ♧♧♧ 》》■',
    expected: '(€♤¤) [£♤¤ => ♧♧♧] 》》■' 
  },
  {
    name: 'INSERT SYMBOLS TO TEXT',
    old: 'Good News',
    current: '☆ Good News ☆',
    expected: '(☆) Good News (☆)'
  },
  {
    name: 'DELETE SYMBOLS FROM TEXT',
    old: 'The box ■ must be gone',
    current: 'The box must be gone',
    expected: 'The box <■> must be gone',
  },
  {
    name: 'ALTER TEXT TO SYMBOL',
    old: 'And the food is five stars',
    current: 'And the food is ☆☆☆☆☆',
    expected: 'And the food is [five => ☆☆☆☆☆] <stars>'
  },
  {
    name: 'ALTER SYMBOL TO TEXT',
    old: 'The ♡ is one of the most important organ',
    current: 'The heart is one of the most important organ',
    expected: 'The [♡ => heart] is one of the most important organ'
  },
  {
    name: 'INSERT ARABIC FROM EMPTY',
    old: '',
    current:'اعلم يجب علينا تعلم أربع مسائل',
    expected: '(اعلم) (يجب) (علينا) (تعلم) (أربع) (مسائل)'
  },
  {
    name: 'INSERT ARABIC',
    old: 'اعلم يجب علينا تعلم أربع مسائل',
    current: 'اعلم رحمك الله يجب علينا تعلم أربع مسائل',
    expected: 'اعلم (رحمك) (الله) يجب علينا تعلم أربع مسائل'
  },
  {
    name: 'ALTER ARABIC',
    old: 'هذه هي نقمة',
    current: 'هذه هي نعمة',
    expected: 'هذه هي [نقمة => نعمة]'
  },
  {
    name: 'DELETE ARABIC',
    old: 'أقسام الكلمة: الاسم والجملة والفعل والحرف',
    current: 'أقسام الكلمة: الاسم والفعل والحرف',
    expected: 'أقسام الكلمة: الاسم <والجملة> والفعل والحرف'
  },
  {
    name: 'INSERT ARABIC TO ALPHABET, ALTER ALPHABET TO ARABIC',
    old: 'The word Al-Kitaab comes from the root word Ka-Ta-Ba which means "write"',
    current: 'The word Al-Kitaab (الكتاب) comes from the root word كتب which means "write"',
    expected: 'The word Al-Kitaab ((الكتاب)) comes from the root word [Ka-Ta-Ba => كتب] which means "write"'
  },
  {
    name: 'DELETE ARABIC AND ALPHABET FROM ALPHABET',
    old: 'There are three that worshipped by Musyrikeen Arab besides Allaah: Laat (اللات), \'Uzair (عزير),  Manaat (منوت), \'Uzza (العزى)',
    current: 'There are three that worshipped by Musyrikeen Arab besides Allaah: Laat (اللات),  Manaat (منوت), \'Uzza (العزى)',
    expected: 'There are three that worshipped by Musyrikeen Arab besides Allaah: Laat (اللات), <\'Uzair> <(عزير),> Manaat (منوت), \'Uzza (العزى)'
  },
  {
    name: 'INSERT ALPHABET TO ARABIC, ALTER ALPHABET TO ARABIC',
    old: 'من اللغة البرنامجية الحديثة: PHP وهي كثير استعمالها',
    current: 'من اللغة البرنامجية الحديثة: Javascript و Golang وهي كثير استعمالها',
    expected: 'من اللغة البرنامجية الحديثة: (Javascript) (و) [PHP => Golang] وهي كثير استعمالها'
  },
  {
    name: 'DELETE ALPHABET FROM ARABIC',
    old: 'الشهوة مثل Nicotine خطيرة جدا',
    current: 'الشهوة خطيرة جدا',
    expected: 'الشهوة <مثل> <Nicotine> خطيرة جدا'
  },
  {
    name: 'TEXT WITH META',
    old: [
      {
        value: 'This',
        meta: {
          id: 1
        }
      },
      {
        value: 'was',
        meta: {
          id: 2
        }
      },
      {
        value: 'not',
        meta: {
          id: 3
        }
      },
      {
        value: 'an',
        meta: {
          id: 4
        }
      }
    ],
    current: 'This is an example',
    expected: 'This <was> [not => is] an (example)'
  },
  {
    name: 'MULTIPLE SAME NAME NO CHANGE',
    old: 'Keep working Keep the spirit Keep smile',
    current: 'Keep working Keep the spirit Keep smile',
    expected: 'Keep working Keep the spirit Keep smile'
  },
  {
    name: 'MULTIPLE SAME NAME INSERT MIDDLE',
    old: 'Keep working Keep spirit Keep smiling every people Don\'t panic',
    current: 'Keep working hard Keep spirit Keep smiling every people Don\'t panic',
    expected: 'Keep working (hard) Keep spirit Keep smiling every people Don\'t panic'
  },
  {
    name: 'REMOVING THE FIRST SAME BETWEEN OTHER WORD',
    old: 'This is an example real example',
    current: 'This is an real example',
    expected: 'This is an <example> real example',
  },
  {
    name: 'ADDING THE SAME BEFORE OTHER WORD',
    old: 'real example',
    current: 'example real example',
    expected: '(example) real example',
  },
  {
    name: 'ADDING THE SAME AFTER OTHER WORD',
    old: 'example real',
    current: 'example real example',
    expected: 'example real (example)',
  },
  {
    name: 'A',
    old: 'A B C D A B C',
    current: 'A B C A B C',
    expected: 'A B C <D> A B C',
  },
  {
    name: 'B',
    old: 'A B A',
    current: 'B A',
    expected: '<A> B A',
  },
  {
    name: 'C',
    old: 'A B A B A B A',
    current: 'B A',
    expected: '<A> B A (B) (A) (B) (A)',
  },
]
