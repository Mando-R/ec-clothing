const db = require("../models")
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
        return res.render("orders.hbs", {
          orders: orders
        })
      })
  },

  // [Create/POST] Shopping carts -> Orders
  postOrder: (req, res) => {
    return Cart.findByPk(req.body.cartId,
      { include: [{ model: Product, as: "cartFindProducts" }] }
    )
      .then(cart => {
        cart = cart.cartFindProducts.map(product => ({
          ...product.dataValues,
        }))

        // 寫入 Order
        return Order.create({
          name: req.body.name,
          address: req.body.address,
          phone: req.body.phone,
          shipping_status: req.body.shipping_status,
          payment_status: req.body.payment_status,
          amount: req.body.amount,
          // 注意：寫入 UserId，才可findAll{where}
          UserId: req.user.id
        })
          .then(order => {
            let results = []
            for (let i = 0; i < cart.length; i++) {
              // 寫入 OrderItem
              results.push(
                OrderItem.create({
                  OrderId: order.id,
                  ProductId: cart[i].id,
                  price: cart[i].price,
                  quantity: cart[i].CartItem.quantity,
                })
              )
            }
            return Promise.all(results)
              .then(() =>
                res.redirect("/orders"),
              )
          })
      })
  },

  // [Delete] Cancel Orders
  cancelOrder: (req, res) => {
    return Order.findByPk(req.params.id, {})
      .then(order => {
        order.update({
          ...req.body,
          shipping_status: "-1",
          payment_status: "-1",
        })
          .then(order => {
            req.flash("success_message", "Order is successfully canceled")

            return res.redirect("back")
          })
      })
  },
}


module.exports = orderController