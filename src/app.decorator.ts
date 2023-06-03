import { createParamDecorator } from '@nestjs/common';

import { getClientIp } from 'request-ip';

export const IpAddress = createParamDecorator((data, req) => {
  console.log('🚀 ~ file: app.decorator.ts:6 ~ IpAddress ~ data:', data);

  if (req.clientIp) return req.clientIp;
  return getClientIp(req); // In case we forgot to include requestIp.mw() in main.ts
});
