import common from "../utils/common";
import * as config from '../constants/conf'

export const getSessionKey = params => {
  return common.requestInPromise({
    url: config.GLOBAL_CONFIG.requestUrl.getSessionKey,
    type: 'GET',
    data: params
  });
}

