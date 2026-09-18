const validateProduct = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: "Nama dan Harga produk tidak boleh kosong!" });
  }
  next();
};

module.exports = { validateProduct };
