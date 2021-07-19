const db = require("../../models")
const { Product, Order, OrderItem, Cart } = db

// ---------- Controller ----------
const orderController = {
  // [Read] Orders page
  getOrders: (req, res) => {
    Order.findAll({
      where: { UserId: req.user.id },
      include: [{ model: Product, as: "orderFindProducts" }],
      order: [["createdAt", "DESC"]]
    })
      .then(orders => {
        // 注意：此處.map 只有一層()，沒有({...})
        orders = orders.map(order =>
          order.toJSON()
        )
        return res.json({
          orders: orders
        })
      })
  },
}


module.exports = orderController
