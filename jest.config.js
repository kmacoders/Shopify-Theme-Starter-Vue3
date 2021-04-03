module.exports = {
  "roots": [
    "<rootDir>/src"
  ],

  "setupFilesAfterEnv": ['<rootDir>/jest.setup.ts'],

  /**
   * Xác định nơi bỏ các file testing
   * Thông thuòng ra sẽ bỏ các file typescript vào hết thư mục src
   */
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],

  /**
   *  Jest sẽ dựa định dạng này để phát hiện các file cần được testing
   */
  "transform": {
    "^.+\\.(ts|tsx|vue)$": "ts-jest"
  },

  /**
   * Thằng ts-jest sẽ xác định các file có dạng này
   * Sau đó sẽ biến đổi về dạng nó có thể hiểu được để chạy jest
   */
  "verbose": true,

  /**
   * Báo cáo các bài test lúc đang chạy
   */
  "globals": {
    "ts-jest": {
      diagnostics: false
    }
  }
  /**
   * Cái này để các hàm của thằng jest trở thành globals
   * không cần phải require hay import khi dùng nữa
   */
}
