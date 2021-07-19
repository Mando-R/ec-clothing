// 引入 Model
const db = require("../models")
const { Product, Cart, CartItem } = db

const cartController = {
  getCart: (req, res) => {
    const cartId = req.session.cartId
    return Cart.findByPk(cartId, {
      include: [{ model: Product, as: "cartFindProducts" }]
    })
      .then(cart => {
        cart = cart || { cartFindProducts: [] }

        // 拆除 dataValues
        cart = cart.cartFindProducts.map(product => ({
          ...product.dataValues,
          // 注意：Handlebars: Access has been denied to resolve the property "id" and "quantity" because it is not an "own property" of its parent.
          cartItemId: product.CartItem.id,
          quantity: product.CartItem.quantity,
          subTotalPrice: product.price * product.CartItem.quantity
        }))

        let totalPrice = cart.length > 0 ? cart.map(product => product.price * product.quantity).reduce((a, b) => a + b) : 0

        let itemAmount = cart.length > 0 ? cart.length : 0

        res.render("carts.hbs", {
          cart: cart,
          totalPrice: totalPrice,
          itemAmount: itemAmount,
          cartId: cartId
        })
      })
  },

  // Add to Cart
  postCart: async (req, res) => {
    const [cart, created] = await Cart.findOrCreate({
      where: {
        id: req.session.cartId || 0,
      },
    })

    const [cartItem, itemCreated] = await CartItem.findOrCreate({
      where: {
        CartId: cart.id,
        ProductId: req.body.productId
      },
      default: {
        CartId: cart.id,
        ProductId: req.body.productId,
      }
    })

    return cartItem.update({
      quantity: (cartItem.quantity || 0) + 1,
    })
      .then(cartItem => {
        req.session.cartId = cart.id
        // 計算 cart 的 itemAmount，並存入 session：
        Cart.findByPk(cart.id, { include: "cartFindProducts" })
          .then(cart => {
            req.session.itemAmount = cart.length

            req.session.save(() => {
              return res.redirect("back")
            })
          })
      })
  },

  // CartItem
  // (1) Plus
  addCartItem: (req, res) => {
    CartItem.findByPk(req.params.id)
      .then(cartItem => {
        cartItem.update({
          quantity: cartItem.quantity + 1,
        })
          .then(cartItem => {
            return res.redirect("back")
          })
      })
  },

  // (2) Minus
  subCartItem: (req, res) => {
    CartItem.findByPk(req.params.id)
      .then(cartItem => {
        cartItem.update({
          quantity: cartItem.quantity - 1 >= 1 ? cartItem.quantity - 1 : 1,
        })
          .then(cartItem => {
            return res.redirect("back")
          })
      })
  },

  // (3) Delete
  deleteCartItem: (req, res) => {
    CartItem.findByPk(req.params.id)
      .then(cartItem => {
        cartItem.destroy()
          .then(cartItem => {
            return res.redirect("back")
          })
      })
  },
}


module.exports = cartController