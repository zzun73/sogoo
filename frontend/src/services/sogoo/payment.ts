import axios from "../../configs/axios";

export default {
  /**
   * 일반 결제 - 결제 요청
   */
  requestNormalPayment: async (data: NormalPaymentsConfirmRequest) => {
    return axios.post("/payments/confirm", data);
  },
};
