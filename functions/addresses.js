export const xrb_to_nano = addr => addr.replace('xrb_', 'nano_')

export const nano_to_xrb = addr => addr.replace('nano_', 'xrb_')

export const bulk_xrb_to_nano = addresses =>
  addresses.map(addr => xrb_to_nano(addr))

export const bulk_nano_to_xrb = addresses =>
  addresses.map(addr => nano_to_xrb(addr))
