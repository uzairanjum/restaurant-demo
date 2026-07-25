import type { ConversationMessage, MenuCategory, Order } from '../types/order'

const MENU_ITEMS: Record<string, { name: string; price: number }> = {
  simple: { name: 'Simple Hamburger', price: 6.5 },
  double: { name: 'Double Meat Hamburger', price: 9.5 },
  triple: { name: 'Triple Meat Burger', price: 12.5 },
  fries: { name: 'Fries', price: 3.5 },
  rings: { name: 'Onion Rings', price: 4.0 },
  soda: { name: 'Coca-Cola', price: 2.0 },
};



function money(n: number) { return n.toFixed(2) }

function defaultConversation(o: Pick<Order, "customer" | "id" | "paymentMethod" | "placedTimeLabel"> & { total: number }): ConversationMessage[] {
  const base: ConversationMessage[] = [
    { from: 'bot', text: `Thanks ${o.customer.split(' ')[0]}! Your order #${o.id} is confirmed — total $${money(o.total)}.`, time: o.placedTimeLabel, ai: true },
  ];
  if (o.paymentMethod === 'cod') {
    base.push({ from: 'bot', text: "You're all set to pay by cash on delivery. We'll let you know once it's on the way.", time: o.placedTimeLabel, ai: true });
  }
  base.push({ from: 'customer', text: 'Great, thank you!', time: o.placedTimeLabel });
  return base;
}



export function buildOrders(): Order[] {
  const raw = [
    { id: '1054', customer: 'Diego Martínez', phone: '+52 55 1234 5678', fulfillment: 'delivery',
      address: 'Av. Álvaro Obregón 182, Roma Norte', deliveryNote: 'Ring doorbell twice, third floor.',
      items: [{ ...MENU_ITEMS.double, qty: 1, notes: 'No onions' }, { ...MENU_ITEMS.fries, qty: 1 }, { ...MENU_ITEMS.soda, qty: 1 }],
      deliveryFee: 2.0, paymentMethod: 'bank_transfer', status: 'needs_attention', issueType: 'payment_review',
      placedMinAgo: 34, placedTimeLabel: '12:01 PM', customerNote: 'Please make it quick, I have a meeting.', internalNote: '',
      proof: { reviewStatus: 'review', txnId: 'TRX-88213', sender: 'Diego Martinez', reference: 'Order 1054', amount: 17.0, date: 'Jul 25, 12:04 PM', notes: '' },
      conversation: [
        { from: 'bot', text: 'Thanks Diego! Your order total is $17.00 (incl. delivery). Pay via bank transfer to CLABE 0123 4567 8901 and send the screenshot here.', time: '12:01 PM', ai: true },
        { from: 'customer', text: 'Just sent it, one sec', time: '12:03 PM' },
        { from: 'customer', text: '📎 Payment screenshot.jpg', time: '12:04 PM', isImage: true },
        { from: 'bot', text: 'Got it — a team member will verify shortly ✅', time: '12:04 PM', ai: true },
      ] },
    { id: '1058', customer: 'Renata Cruz', phone: '+52 55 9081 2233', fulfillment: 'pickup', address: '',
      items: [{ ...MENU_ITEMS.simple, qty: 2 }, { ...MENU_ITEMS.rings, qty: 1 }],
      deliveryFee: 0, paymentMethod: 'bank_transfer', status: 'needs_attention', issueType: 'payment_invalid',
      placedMinAgo: 51, placedTimeLabel: '11:44 AM', customerNote: '', internalNote: 'Second time this month amount is short — flag if it happens again.',
      proof: { reviewStatus: 'rejected', txnId: 'TRX-88190', sender: 'Renata Cruz G.', reference: 'burger order', amount: 12.0, date: 'Jul 25, 11:49 AM', notes: 'Amount doesn\'t match order total — $17.00 expected, $12.00 received.' },
      conversation: [
        { from: 'bot', text: 'Your order total is $17.00. Please transfer to CLABE 0123 4567 8901 and send proof here.', time: '11:45 AM', ai: true },
        { from: 'customer', text: '📎 Payment screenshot.jpg', time: '11:49 AM', isImage: true },
        { from: 'bot', text: 'Thanks — reviewing now.', time: '11:49 AM', ai: true },
        { from: 'staff', text: 'Hi Renata, the screenshot shows $12.00 but your order total is $17.00 — could you send the remaining $5.00 or a corrected screenshot?', time: '12:10 PM' },
      ] },
    { id: '1061', customer: 'Julián Paredes', phone: '+52 55 4471 0098', fulfillment: 'delivery', address: '',
      items: [{ ...MENU_ITEMS.triple, qty: 1, notes: 'Extra sauce' }],
      deliveryFee: 2.0, paymentMethod: 'cod', status: 'needs_attention', issueType: 'missing_address',
      placedMinAgo: 12, placedTimeLabel: '12:23 PM', customerNote: '', internalNote: '',
      conversation: [
        { from: 'bot', text: 'Thanks Julián! Confirmed: 1x Triple Meat Burger, extra sauce — cash on delivery. Could you share your delivery address?', time: '12:23 PM', ai: true },
        { from: 'customer', text: 'Oh sorry, one sec', time: '12:24 PM' },
      ] },
    { id: '1063', customer: 'Camila Ibarra', phone: '+52 55 3305 6671', fulfillment: 'delivery',
      address: 'Calle Colima 45, Roma Norte', deliveryNote: '',
      items: [{ ...MENU_ITEMS.double, qty: 1 }],
      deliveryFee: 2.0, paymentMethod: 'cod', status: 'needs_attention', issueType: 'customer_change',
      placedMinAgo: 22, placedTimeLabel: '12:13 PM', customerNote: 'Can I add a Fries to this order?', internalNote: '',
      conversation: [
        { from: 'bot', text: 'Order confirmed: 1x Double Meat Hamburger, cash on delivery.', time: '12:13 PM', ai: true },
        { from: 'customer', text: 'Wait can I also add a Fries please', time: '12:16 PM' },
      ] },
    { id: '1049', customer: 'Andrés Molina', phone: '+52 55 2210 7754', fulfillment: 'pickup', address: '',
      items: [{ ...MENU_ITEMS.simple, qty: 1 }, { ...MENU_ITEMS.soda, qty: 1 }],
      deliveryFee: 0, paymentMethod: 'cod', status: 'ready_for_kitchen', issueType: null,
      placedMinAgo: 6, placedTimeLabel: '12:29 PM', customerNote: '', internalNote: '' },
    { id: '1051', customer: 'Valentina Rojas', phone: '+52 55 8843 1120', fulfillment: 'delivery',
      address: 'Av. Yucatán 88, Condesa', deliveryNote: 'Leave with concierge.',
      items: [{ ...MENU_ITEMS.double, qty: 2 }],
      deliveryFee: 2.0, paymentMethod: 'bank_transfer', status: 'ready_for_kitchen', issueType: null,
      placedMinAgo: 9, placedTimeLabel: '12:26 PM', customerNote: '', internalNote: '',
      proof: { reviewStatus: 'verified', txnId: 'TRX-88241', sender: 'Valentina Rojas', reference: 'order 1051', amount: 21.0, date: 'Jul 25, 12:27 PM', notes: 'Matches — verified.' } },
    { id: '1044', customer: 'Mateo Sánchez', phone: '+52 55 6672 4410', fulfillment: 'pickup', address: '',
      items: [{ ...MENU_ITEMS.triple, qty: 1 }],
      deliveryFee: 0, paymentMethod: 'cod', status: 'preparing', issueType: null,
      placedMinAgo: 14, placedTimeLabel: '12:21 PM', customerNote: '', internalNote: '' },
    { id: '1046', customer: 'Lucía Fernández', phone: '+52 55 1102 9987', fulfillment: 'delivery',
      address: 'Calle Orizaba 20, Roma Norte', deliveryNote: '',
      items: [{ ...MENU_ITEMS.double, qty: 1 }, { ...MENU_ITEMS.fries, qty: 1 }],
      deliveryFee: 2.0, paymentMethod: 'bank_transfer', status: 'preparing', issueType: null,
      placedMinAgo: 18, placedTimeLabel: '12:17 PM', customerNote: '', internalNote: '',
      proof: { reviewStatus: 'verified', txnId: 'TRX-88235', sender: 'Lucía Fernández', reference: 'order 1046', amount: 15.0, date: 'Jul 25, 12:18 PM', notes: 'Matches — verified.' } },
    { id: '1047', customer: 'Nicolás Herrera', phone: '+52 55 7789 0034', fulfillment: 'pickup', address: '',
      items: [{ ...MENU_ITEMS.simple, qty: 2 }],
      deliveryFee: 0, paymentMethod: 'cod', status: 'preparing', issueType: null,
      placedMinAgo: 21, placedTimeLabel: '12:14 PM', customerNote: '', internalNote: '' },
    { id: '1039', customer: 'Isabela Torres', phone: '+52 55 3321 8890', fulfillment: 'delivery',
      address: 'Av. México 33, Condesa', deliveryNote: '',
      items: [{ ...MENU_ITEMS.triple, qty: 1 }, { ...MENU_ITEMS.rings, qty: 1 }],
      deliveryFee: 2.0, paymentMethod: 'bank_transfer', status: 'ready', issueType: null,
      placedMinAgo: 27, placedTimeLabel: '12:08 PM', customerNote: '', internalNote: '',
      proof: { reviewStatus: 'verified', txnId: 'TRX-88222', sender: 'Isabela Torres', reference: 'order 1039', amount: 18.5, date: 'Jul 25, 12:09 PM', notes: 'Matches — verified.' } },
    { id: '1041', customer: 'Emiliano Vargas', phone: '+52 55 4456 7723', fulfillment: 'pickup', address: '',
      items: [{ ...MENU_ITEMS.simple, qty: 1 }],
      deliveryFee: 0, paymentMethod: 'cod', status: 'ready', issueType: null,
      placedMinAgo: 30, placedTimeLabel: '12:05 PM', customerNote: '', internalNote: '' },
    { id: '1035', customer: 'Martina Silva', phone: '+52 55 9987 1123', fulfillment: 'delivery',
      address: 'Calle Tonalá 61, Roma Norte', deliveryNote: '',
      items: [{ ...MENU_ITEMS.double, qty: 2 }, { ...MENU_ITEMS.soda, qty: 1 }],
      deliveryFee: 2.0, paymentMethod: 'bank_transfer', status: 'out_for_delivery', issueType: null,
      placedMinAgo: 40, placedTimeLabel: '11:55 AM', customerNote: '', internalNote: '',
      proof: { reviewStatus: 'verified', txnId: 'TRX-88201', sender: 'Martina Silva', reference: 'order 1035', amount: 23.0, date: 'Jul 25, 11:57 AM', notes: 'Matches — verified.' } },
    { id: '1020', customer: 'Santiago Ruiz', phone: '+52 55 2298 6612', fulfillment: 'pickup', address: '',
      items: [{ ...MENU_ITEMS.triple, qty: 1 }, { ...MENU_ITEMS.soda, qty: 1 }],
      deliveryFee: 0, paymentMethod: 'cod', status: 'completed', issueType: null,
      placedMinAgo: 128, placedTimeLabel: '10:07 AM', customerNote: '', internalNote: '' },
    { id: '1015', customer: 'Florencia Gómez', phone: '+52 55 5567 8821', fulfillment: 'delivery',
      address: 'Av. Insurgentes Sur 700, Roma Norte', deliveryNote: '',
      items: [{ ...MENU_ITEMS.double, qty: 1 }, { ...MENU_ITEMS.fries, qty: 1 }],
      deliveryFee: 2.0, paymentMethod: 'bank_transfer', status: 'completed', issueType: null,
      placedMinAgo: 182, placedTimeLabel: '9:13 AM', customerNote: '', internalNote: '',
      proof: { reviewStatus: 'verified', txnId: 'TRX-88150', sender: 'Florencia Gómez', reference: 'order 1015', amount: 15.5, date: 'Jul 25, 9:15 AM', notes: 'Matches — verified.' } },
  ];
  return raw.map(o => {
    const subtotal = o.items.reduce((s, it) => s + it.price * it.qty, 0);
    const total = subtotal + o.deliveryFee;
    return { ...o, subtotal, total, conversation: o.conversation || defaultConversation({ customer: o.customer, id: o.id, paymentMethod: o.paymentMethod as Order['paymentMethod'], placedTimeLabel: o.placedTimeLabel, total }) } as Order;
  });
}



export function buildRawMenu(): MenuCategory[] {
  return [
    { name: 'Burgers', items: [
      { name: 'Simple Hamburger', price: 6.5, desc: '200g patty, American & cheddar cheese, lettuce, tomato, bacon, caramelized pickles.', options: ['No onions', 'No tomato', 'No pickles', 'No bacon'], addons: [{ name: 'Extra cheese', price: 1.0 }, { name: 'Extra bacon', price: 1.5 }, { name: 'Extra sauce', price: 0.5 }] },
      { name: 'Double Meat Hamburger', price: 9.5, desc: '400g double patty, American & cheddar cheese, lettuce, tomato, bacon, caramelized pickles.', options: ['No onions', 'No tomato', 'No pickles', 'No bacon'], addons: [{ name: 'Extra cheese', price: 1.0 }, { name: 'Extra bacon', price: 1.5 }, { name: 'Extra sauce', price: 0.5 }] },
      { name: 'Triple Meat Burger', price: 12.5, desc: '600g triple patty, American & cheddar cheese, lettuce, tomato, bacon, caramelized pickles.', options: ['No onions', 'No tomato', 'No pickles', 'No bacon'], addons: [{ name: 'Extra cheese', price: 1.0 }, { name: 'Extra bacon', price: 1.5 }, { name: 'Extra sauce', price: 0.5 }] },
    ] },
    { name: 'Sides', items: [
      { name: 'Fries', price: 3.5, desc: 'Crispy golden fries.', options: ['Regular', 'Large (+$1.50)'], addons: [{ name: 'Cheese sauce', price: 1.0 }] },
      { name: 'Onion Rings', price: 4.0, desc: 'Crispy battered onion rings.', options: [], addons: [{ name: 'Chipotle dip', price: 0.5 }] },
    ] },
    { name: 'Drinks', items: [
      { name: 'Coca-Cola', price: 2.0, desc: '355ml can.', options: [], addons: [] },
      { name: 'Lemonade', price: 2.5, desc: 'Fresh-squeezed, house recipe.', options: [], addons: [] },
    ] },
  ];
}


