export default {
  terminals: {
    '<color_editor_id_1>': {
      id: '<color_editor_id_1>',
      subject: '<color_id_1>',
    },
    '<color_editor_id_2>': {
      id: '<color_editor_id_2>',
      subject: '<color_id_5>',
    },
    '<color_editor_id_3>': {
      id: '<color_editor_id_3>',
      subject: '<color_id_6>',
    },
  },
  layout: {
    id: '<root>',
    direction: 'x',
    locked: true,
    type: 'root',
    content: [
      { id: '<strip_id_1>',
        type: 'strip',
        direction: 'x',
        content: [
          { id: '<color_editor_id_1>',
            type: 'terminal' },
          { id: '<stack_id_1>',
            type: 'stack',
            content: [
              { id: '<color_editor_id_2>',
                type: 'terminal' },
              { id: '<color_editor_id_3>',
                type: 'terminal' },
            ] },
        ] },
    ],
  },
}
