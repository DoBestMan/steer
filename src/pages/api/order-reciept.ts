import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

import { OrderReciept } from '~/data/models/OrderReciept';
import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetOrderReciept } from '~/lib/backend/order-reciept';

export default async (request: NextApiRequest, response: NextApiResponse) => {
  backendBootstrap({ request });
  const { orderId, zip } = request.query;
  const res = await backendGetOrderReciept({
    orderId,
    zip,
  } as OrderTrackingInput);
  if (res.isSuccess) {
    const data = (res.data as unknown) as OrderReciept;
    const { href } = data.receiptLink;

    const pdfBuffer = await fetch(href);
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Transfer-Encoding', 'binary');
    response.setHeader(
      'Content-Disposition',
      'attachment; filename="' + orderId + '.pdf',
    );
    response.send(pdfBuffer.body);
    return;
  }

  response.status(res.error.statusCode).end();
};
