const formatPrice = (price) => `USD ${Intl.NumberFormat("en-US").format(price)}`;

export { formatPrice };
