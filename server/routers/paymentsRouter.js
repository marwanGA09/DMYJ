const express = require('express');

const router = express.Router();

const {
  getAllPayments,
  createPayments,
  updatePayment,
  deletePayment,
  getPaymentById,
} = require('./../controllers/paymentController');

router.route('/').get(getAllPayments).post(createPayments);

// UPDATE AND DELETE (MAY NOT IMPLEMENTED)
router
  .route('/:id')
  .get(getPaymentById)
  .patch(updatePayment)
  .delete(deletePayment);

module.exports = router;
