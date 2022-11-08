'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'microposts',
      [
        {
          user_id: 1,
          title: '湯の郷絢ほのか',
          image: 'https://res.cloudinary.com/dzorivc9n/image/upload/v1667883362/Develope/sentou003_mx73hs.jpg',
          price: faker.commerce.price(),
          description: '札幌市清田の「湯の郷絢ほのか」は24時間営業！3つの岩盤浴、お食事処、露天ほのか薬湯、季節の替り湯、高濃度炭酸泉、高温サウナ、スチーム塩サウナ、ボディケア、あかすり、整体、リラックス＆コミックコーナー、ゲームコーナーなど充実の温浴施設です。',
          location: '北海道札幌市清田区清田2条3丁目2-26',
          geometry: '{ "type": "Point", "coordinates": [141.4357252, 43.0012096] }',
          tag: '["sauna","cold_water","open_air","food","wifi"]',
          created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        }, {
          user_id: 1,
          title: 'THE SPA 西新井',
          image: 'https://res.cloudinary.com/dzorivc9n/image/upload/v1667883362/Develope/sentou004_aafuu6.jpg',
          price: faker.commerce.price(),
          description: 'もっとも身近なスパリゾート',
          location: '東京都足立区西新井栄町１丁目１７−１０ ウェルネスタウン西新井 3階 セントラル',
          geometry: '{ "type": "Point", "coordinates": [139.7877017,35.7747844] }',
          tag: '["open_air"]',
          created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        }, {
          user_id: 2,
          title: '草加健康センター',
          image: 'https://res.cloudinary.com/dzorivc9n/image/upload/v1667883362/Develope/sentou005_llfcmu.jpg',
          price: faker.commerce.price(),
          description: '草津温泉・薬湯・高濃度炭酸泉・電子風呂・サウナなどをご用意。職人による本格料理をカラオケや麻雀、エステ等と併せてお楽しみください。獨協大学前駅近くで24時間営業の健康センターです。',
          location: '埼玉県草加市北谷２丁目２３−２３',
          geometry: '{ "type": "Point", "coordinates": [139.77859,35.8411846] }',
          tag: '["sauna","cold_water","open_air"]',
          created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        }, {
          user_id: 2,
          title: 'かるまる',
          image: 'https://res.cloudinary.com/dzorivc9n/image/upload/v1667889919/Develope/sauna/sauna004_drihm5.jpg',
          price: faker.commerce.price(),
          description: '東京都池袋のサウナ&ホテル宿泊施設【かるまる池袋店】公式サイト。関東最大級のサウナ施設です。4種のサウナと水風呂、5種のお風呂、さらに宿泊施設がある複合型男性専用施設。池袋駅西口のC6出口より徒歩30秒。',
          location: '東京都豊島区池袋２丁目７−７ ロビー会館',
          geometry: '{ "type": "Point", "coordinates": [139.706449,35.7324297] }',
          tag: '["sauna","cold_water","open_air","food","wifi"]',
          created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        }, {
          user_id: 3,
          title: 'すすきの ニコー リフレ',
          image: 'https://res.cloudinary.com/dzorivc9n/image/upload/v1667889919/Develope/sauna/sauna003_yghhay.jpg',
          price: faker.commerce.price(),
          description: '札幌のカプセルホテル・ビジネスホテル/スパ・サウナならNikoh Refre（ニコーリフレ）。サウナ通を虜にするロウリュ、こだわりのお食事、リラクゼーションで上質な睡眠',
          location: '北海道札幌市中央区南３条西２丁目14番地 ニコービル',
          geometry: '{ "type": "Point", "coordinates": [141.3533825, 43.057166] }',
          tag: '["sauna","cold_water","food","wifi"]',
          created_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
          updated_at: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
