// @flow
export const xrb_to_nano = (addr: string) => addr.replace('xrb_', 'nano_')

export const nano_to_xrb = (addr: string) => addr.replace('nano_', 'xrb_')

export const bulk_xrb_to_nano: (Array<string>) => Array<string> = addresses =>
  addresses.map(addr => xrb_to_nano(addr))

export const bulk_nano_to_xrb: (Array<string>) => Array<string> = addresses =>
  addresses.map(addr => nano_to_xrb(addr))
