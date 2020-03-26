import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
// eslint-disable-next-line no-unused-vars
import { ItemModel, ItemSize, ItemValue } from '@/models/ElementModel';
import { RecordSheetItem } from '@/utils/RecordSheetItem';

@Component
export default class RecordSheetComponent extends Vue {
  @Prop({ required: true })
  protected value!: Array<Array<Array<number>>>
  protected readonly cells = {
    size: 9
  };
  protected readonly recordSheet: Array<Array<RecordSheetItem>> = [
    [RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY],
    [RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY],
    [RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY],
    [RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY],
    [RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY],
    [RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY],
    [RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY],
    [RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY, RecordSheetItem.EMPTY]
  ];
  protected readonly formulasValues: Array<Array<ItemModel>> = [
    [
      {
        size: ItemSize.SMALL,
        value: ItemValue.NEGATIVE
      },
      {
        size: ItemSize.SMALL,
        value: ItemValue.POSITIVE
      },
      {
        size: ItemSize.LARGE,
        value: ItemValue.NEGATIVE
      }
    ],
    [
      {
        size: ItemSize.SMALL,
        value: ItemValue.POSITIVE
      },
      {
        size: ItemSize.SMALL,
        value: ItemValue.NEGATIVE
      },
      {
        size: ItemSize.LARGE,
        value: ItemValue.POSITIVE
      }
    ],
    [
      {
        size: ItemSize.SMALL,
        value: ItemValue.POSITIVE
      },
      {
        size: ItemSize.LARGE,
        value: ItemValue.NEGATIVE
      },
      {
        size: ItemSize.SMALL,
        value: ItemValue.NEGATIVE
      }
    ],
    [
      {
        size: ItemSize.SMALL,
        value: ItemValue.NEGATIVE
      },
      {
        size: ItemSize.LARGE,
        value: ItemValue.POSITIVE
      },
      {
        size: ItemSize.SMALL,
        value: ItemValue.POSITIVE
      }
    ],
    [
      {
        size: ItemSize.LARGE,
        value: ItemValue.NEGATIVE
      },
      {
        size: ItemSize.SMALL,
        value: ItemValue.NEGATIVE
      },
      {
        size: ItemSize.SMALL,
        value: ItemValue.POSITIVE
      }
    ],
    [
      {
        size: ItemSize.LARGE,
        value: ItemValue.POSITIVE
      },
      {
        size: ItemSize.SMALL,
        value: ItemValue.POSITIVE
      },
      {
        size: ItemSize.SMALL,
        value: ItemValue.NEGATIVE
      }
    ],
    [
      {
        size: ItemSize.LARGE,
        value: ItemValue.NEGATIVE
      },
      {
        size: ItemSize.LARGE,
        value: ItemValue.NEGATIVE
      },
      {
        size: ItemSize.LARGE,
        value: ItemValue.NEGATIVE
      }
    ],
    [
      {
        size: ItemSize.LARGE,
        value: ItemValue.POSITIVE
      },
      {
        size: ItemSize.LARGE,
        value: ItemValue.POSITIVE
      },
      {
        size: ItemSize.LARGE,
        value: ItemValue.POSITIVE
      }
    ]
  ];

  protected created () {
    this.onValueUpdated(this.value);
  }

  protected get ingridients () {
    return [
      'img/game/mushroom.jpg',
      'img/game/ivy.jpg',
      'img/game/toad.jpg',
      'img/game/chicken-foot.jpg',
      'img/game/flower.jpg',
      'img/game/mandrake.jpg',
      'img/game/scorpion.jpg',
      'img/game/crow-feather.jpg'
    ];
  }
  protected get formulas () {
    return [
      'img/game/rlp_glp_blp.png',
      'img/game/rln_gln_bln.png',
      'img/game/rlp_gsp_bsn.png',
      'img/game/rln_gsn_bsp.png',
      'img/game/rsn_glp_bsp.png',
      'img/game/rsp_gln_bsn.png',
      'img/game/rsp_gsn_blp.png',
      'img/game/rsn_gsp_bln.png',
    ];
  }

  @Watch('value')
  protected onValueUpdated (value: Array<Array<Array<number>>>) {
    for (let i = 0; i < this.recordSheet.length; i++) {
      for (let j = 0; j < this.recordSheet[i].length; j++) {
        this.$set(this.recordSheet[i], j, RecordSheetItem.EMPTY);
      }
    }

    for (let i = 0; i < value.length; i++) {
      for (let j = 0; j < value[i].length; j++) {

        // for soup
        if (value[i][j].every(it => it == ItemValue.NEUTRAL)) {
          for (let k = 0; k < this.recordSheet[i].length; k++) {
            if (this.recordSheet[i + 1][k] != RecordSheetItem.EMPTY) {
              this.$set(this.recordSheet[j], k % 2 > 0 ? k - 1 : k + 1, RecordSheetItem.MARK);
            }

            if (this.recordSheet[j][k] != RecordSheetItem.EMPTY) {
              this.$set(this.recordSheet[i + 1], k % 2 > 0 ? k - 1 : k + 1, RecordSheetItem.MARK);
            }
          }
          // for 1 color potions
        } else if (value[i][j].filter(it => it != ItemValue.NEUTRAL).length == 1) {
          for (let k = 0; k < this.recordSheet[i].length; k++) {
            if (value[i][j].some((it, index) => it != ItemValue.NEUTRAL && it != this.formulasValues[k][index].value)) {
              this.$set(this.recordSheet[i + 1], k, RecordSheetItem.MARK);
              this.$set(this.recordSheet[j], k, RecordSheetItem.MARK);
            }
          }
          // for 2 color's potions
        } else if (value[i][j].filter(it => it != ItemValue.NEUTRAL).length == 2) {
          for (let k = 0; k < this.recordSheet[i].length; k++) {
            if (value[i][j].every((it, index) => it != this.formulasValues[k][index].value)) {
              this.$set(this.recordSheet[i + 1], k, RecordSheetItem.MARK);
              this.$set(this.recordSheet[j], k, RecordSheetItem.MARK);
            }
          }
        }
      }
    }
  }
}
