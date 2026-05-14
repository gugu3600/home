import 'dotenv/config'
import { prisma } from '../config/prisma.js'
import bcrypt from 'bcrypt'

const allPermissions = [
  'role-create', 'role-read', 'role-update', 'role-delete',
  'permission-create', 'permission-read', 'permission-update', 'permission-delete',
  'category-create', 'category-read', 'category-update', 'category-delete',
  'item-create', 'item-read', 'item-update', 'item-delete',
  'user-create', 'user-read', 'user-update', 'user-delete',
]

const memberPermissions = [
  'category-read',
  'item-read',
  'user-read',
]

async function main() {
  console.log('Seeding...')

  const seeded = await prisma.role.findFirst()
  if (seeded) {
    console.log('Database already seeded')
    return
  }

  const adminRole = await prisma.role.create({
    data: { name: 'admin', guardName: 'web' },
  })

  const memberRole = await prisma.role.create({
    data: { name: 'member', guardName: 'web' },
  })

  const allPerms = await Promise.all(
    allPermissions.map((name) =>
      prisma.permission.create({ data: { name, guardName: 'web' } })
    )
  )

  const permMap = {}
  allPerms.forEach((p) => { permMap[p.name] = p.id })

  await prisma.rolePermission.createMany({
    data: allPerms.map((p) => ({ roleId: adminRole.id, permissionId: p.id })),
  })

  await prisma.rolePermission.createMany({
    data: memberPermissions.map((name) => ({ roleId: memberRole.id, permissionId: permMap[name] })),
  })

  const hashed = await bcrypt.hash('gugu3600', 10)
  await prisma.user.create({
    data: {
      name: 'gugu',
      email: 'jukonzai@gmail.com',
      password: hashed,
      roleId: adminRole.id,
    },
  })

  await prisma.user.create({
    data: {
      name: 'member',
      email: 'member@home.local',
      password: hashed,
      roleId: memberRole.id,
    },
  })

  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Electronics', description: 'Electronic devices and gadgets' } }),
    prisma.category.create({ data: { name: 'Furniture', description: 'Home and office furniture' } }),
    prisma.category.create({ data: { name: 'Kitchen', description: 'Kitchen appliances and tools' } }),
    prisma.category.create({ data: { name: 'Cleaning', description: 'Cleaning supplies and equipment' } }),
    prisma.category.create({ data: { name: 'Decor', description: 'Home decoration items' } }),
  ])

  const products = [
    { name: 'LED Desk Lamp', sku: 'ELE-001', price: 29.99, quantity: 50, description: 'Adjustable LED desk lamp with USB charging', categoryIndex: 0 },
    { name: 'Smart Plug', sku: 'ELE-002', price: 14.99, quantity: 100, description: 'WiFi smart plug with voice control', categoryIndex: 0 },
    { name: 'Bluetooth Speaker', sku: 'ELE-003', price: 39.99, quantity: 30, description: 'Portable waterproof bluetooth speaker', categoryIndex: 0 },
    { name: 'Office Chair', sku: 'FUR-001', price: 149.99, quantity: 15, description: 'Ergonomic mesh office chair', categoryIndex: 1 },
    { name: 'Bookshelf', sku: 'FUR-002', price: 79.99, quantity: 20, description: '5-tier wooden bookshelf', categoryIndex: 1 },
    { name: 'Folding Table', sku: 'FUR-003', price: 49.99, quantity: 25, description: 'Portable folding table for dining', categoryIndex: 1 },
    { name: 'Non-stick Pan Set', sku: 'KIT-001', price: 59.99, quantity: 40, description: '3-piece non-stick frying pan set', categoryIndex: 2 },
    { name: 'Coffee Maker', sku: 'KIT-002', price: 34.99, quantity: 35, description: '12-cup drip coffee maker', categoryIndex: 2 },
    { name: 'Food Container Set', sku: 'KIT-003', price: 19.99, quantity: 60, description: '10-piece glass food storage set', categoryIndex: 2 },
    { name: 'Vacuum Cleaner', sku: 'CLN-001', price: 89.99, quantity: 12, description: 'Bagless upright vacuum cleaner', categoryIndex: 3 },
    { name: 'Mop Bundle', sku: 'CLN-002', price: 24.99, quantity: 45, description: 'Spray mop with washable pads', categoryIndex: 3 },
    { name: 'Wall Clock', sku: 'DEC-001', price: 22.99, quantity: 55, description: 'Silent analog wall clock', categoryIndex: 4 },
    { name: 'Throw Pillow Set', sku: 'DEC-002', price: 35.99, quantity: 40, description: 'Set of 2 decorative throw pillows', categoryIndex: 4 },
    { name: 'Indoor Plant Pot', sku: 'DEC-003', price: 15.99, quantity: 70, description: 'Ceramic plant pot with drainage', categoryIndex: 4 },
  ]

  for (const p of products) {
    await prisma.item.create({
      data: {
        name: p.name,
        sku: p.sku,
        price: p.price,
        quantity: p.quantity,
        description: p.description,
        categoryId: categories[p.categoryIndex].id,
      },
    })
  }

  console.log('Seed complete: admin + member roles, permissions, 2 users, categories, products')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
