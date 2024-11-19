import axios from "../../configs/axios";

export default {
  /**
   * 일반 결제 - 결제 요청
   */
  requestNormalPayment: async (data: NormalPaymentsConfirmRequest) => {
    return axios.post("/payments/confirm", data);
  },

  /**
   * 구독 결제 - 카드 등록, 결제 요청
   */
  requestSubscribePayment: async (data: SubscribePaymentsConfirmRequest) => {
    return axios.post("/payments/subscriptions", data);
  },
};
