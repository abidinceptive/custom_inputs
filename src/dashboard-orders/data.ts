import { iOrder, } from './Orders';

const ordersData: iOrder[] = [
    {
        id: 1,
        date: '2025-03-04T15:30:00',
        name: 'John Smith',
        phone: '555-123-4567',
        totalPrice: 37.98,
        totalQuantity: 3,
        paymentMethod: 'credit card',
        pickupOrDelivery: 'pickup',
        status: 'completed',
        items: [
            {
                id: 101,
                orderId: '1',
                name: 'Margherita Pizza',
                price: 14.99,
                quantity: 1
            },
            {
                id: 102,
                orderId: '1',
                name: 'Caesar Salad',
                price: 8.99,
                quantity: 1
            },
            {
                id: 103,
                orderId: '1',
                name: 'Garlic Bread',
                price: 4.99,
                quantity: 1
            }
        ],
        orderActivities: [
            { status: "created", timestamp: "2025-03-05T10:00:00Z" },
            { status: "accepted", timestamp: "2025-03-05T10:05:00Z" },
        ]
    },
    {
        id: 2,
        date: '2025-03-04T17:45:00',
        name: 'Emily Johnson',
        phone: '555-987-6543',
        totalPrice: 52.97,
        totalQuantity: 7,
        paymentMethod: 'cash',
        pickupOrDelivery: 'delivery',
        status: 'accepted',
        items: [
            {
                id: 104,
                orderId: '2',
                name: 'Pepperoni Pizza',
                price: 16.99,
                quantity: 2
            },
            {
                id: 105,
                orderId: '2',
                name: 'Buffalo Wings',
                price: 12.99,
                quantity: 1
            },
            {
                id: 106,
                orderId: '2',
                name: 'Soda',
                price: 2.99,
                quantity: 4
            }
        ],
        orderActivities: [
            { status: "created", timestamp: "2025-03-05T09:00:00Z" },
            { status: "accepted", timestamp: "2025-03-05T09:15:00Z" },
            { status: "modified", timestamp: "2025-03-05T09:20:00Z" },
            { status: "completed", timestamp: "2025-03-05T09:40:00Z" },
        ]
    },
    {
        id: 3,
        date: '2025-03-05T10:15:00',
        name: 'Michael Brown',
        phone: '555-456-7890',
        totalPrice: 28.99,
        totalQuantity: 4,
        paymentMethod: 'credit card',
        pickupOrDelivery: 'pickup',
        status: 'cancelled',
        items: [
            {
                id: 107,
                orderId: '3',
                name: 'Hawaiian Pizza',
                price: 15.99,
                quantity: 1
            },
            {
                id: 108,
                orderId: '3',
                name: 'Breadsticks',
                price: 6.99,
                quantity: 1
            },
            {
                id: 109,
                orderId: '3',
                name: 'Cheesecake',
                price: 6.01,
                quantity: 2
            }
        ],
        orderActivities: [
            { status: "created", timestamp: "2025-03-05T08:30:00Z" },
            { status: "accepted", timestamp: "2025-03-05T08:45:00Z" },
            { status: "completed", timestamp: "2025-03-05T09:15:00Z" },
        ]
    },
    {
        id: 4,
        date: '2025-03-05T12:30:00',
        name: 'Sarah Wilson',
        phone: '555-321-6547',
        totalPrice: 76.95,
        totalQuantity: 6,
        paymentMethod: 'online',
        pickupOrDelivery: 'delivery',
        status: 'completed',
        items: [
            {
                id: 110,
                orderId: '4',
                name: 'Supreme Pizza',
                price: 18.99,
                quantity: 2
            },
            {
                id: 111,
                orderId: '4',
                name: 'Chicken Parmesan',
                price: 16.99,
                quantity: 1
            },
            {
                id: 112,
                orderId: '4',
                name: 'Tiramisu',
                price: 7.99,
                quantity: 3
            }
        ],
        orderActivities: [
            { status: "created", timestamp: "2025-03-05T07:50:00Z" },
            { status: "cancelled", timestamp: "2025-03-05T07:55:00Z" },
        ]
    },
    {
        id: 5,
        date: '2025-03-05T14:45:00',
        name: 'David Miller',
        phone: '555-789-0123',
        totalPrice: 29.98,
        totalQuantity: 2,
        paymentMethod: 'cash',
        pickupOrDelivery: 'pickup',
        status: 'rejected',
        items: [
            {
                id: 113,
                orderId: '5',
                name: 'Veggie Pizza',
                price: 15.99,
                quantity: 1
            },
            {
                id: 114,
                orderId: '5',
                name: 'Greek Salad',
                price: 13.99,
                quantity: 1
            }
        ],
        orderActivities: [
            { status: "created", timestamp: "2025-03-05T11:00:00Z" },
            { status: "accepted", timestamp: "2025-03-05T11:10:00Z" },
            { status: "modified", timestamp: "2025-03-05T11:20:00Z" },
            { status: "cancelled", timestamp: "2025-03-05T11:30:00Z" },
        ]
    },
    {
        id: 6,
        date: '2025-03-05T18:00:00',
        name: 'Jessica Taylor',
        phone: '555-654-3210',
        totalPrice: 89.94,
        totalQuantity: 10,
        paymentMethod: 'credit card',
        pickupOrDelivery: 'delivery',
        status: 'accepted',
        items: [
            {
                id: 115,
                orderId: '6',
                name: 'Meat Lover\'s Pizza',
                price: 19.99,
                quantity: 3
            },
            {
                id: 116,
                orderId: '6',
                name: 'Mozzarella Sticks',
                price: 8.99,
                quantity: 2
            },
            {
                id: 117,
                orderId: '6',
                name: 'Chocolate Lava Cake',
                price: 5.99,
                quantity: 2
            },
            {
                id: 118,
                orderId: '6',
                name: 'Iced Tea',
                price: 2.99,
                quantity: 3
            }
        ],
        orderActivities: [
            { status: "created", timestamp: "2025-03-05T06:00:00Z" },
            { status: "accepted", timestamp: "2025-03-05T06:20:00Z" },
            { status: "cancelled", timestamp: "2025-03-05T06:30:00Z" },
        ]
    }
];

export default ordersData;