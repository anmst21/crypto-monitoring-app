export const formatName = (symbol: string): string => {
  if (symbol.endsWith("USD")) {
    return symbol.slice(0, -3);
  }
  return symbol;
};

export const formatPrice = (price: number): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(price);
};

export const formatChangePercent = (
  changePercent: number
): {
  price: string;
  direction: boolean | null;
} => {
  if (changePercent === 0) {
    return {
      price: "0.00%",
      direction: null,
    };
  }

  const roundedPercent = Number(changePercent.toFixed(7)); // Increase the precision if needed

  const direction = roundedPercent > 0;

  const formattedPrice = Math.abs(roundedPercent).toFixed(2) + "%";

  return {
    price: formattedPrice,
    direction: direction,
  };
};

export const formatBigDollars = (marketCap: number): string => {
  let formattedCap: string;

  if (marketCap >= 1_000_000_000_000) {
    formattedCap = (marketCap / 1_000_000_000_000).toFixed(1) + "T";
  } else if (marketCap >= 1_000_000_000) {
    formattedCap = (marketCap / 1_000_000_000).toFixed(1) + "B";
  } else if (marketCap >= 1_000_000) {
    formattedCap = (marketCap / 1_000_000).toFixed(1) + "M";
  } else {
    formattedCap = (marketCap / 1_000).toFixed(0) + "K";
  }

  return "$" + formattedCap;
};
