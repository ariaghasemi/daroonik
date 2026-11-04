import {
  boolean,
  integer,
  jsonb,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  nameEn: varchar("name_en", { length: 120 }).notNull(),
  country: varchar("country", { length: 60 }).notNull().default(""),
  description: text("description").notNull().default(""),
  featured: boolean("featured").notNull().default(false),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  title: varchar("title", { length: 120 }).notNull(),
  parentSlug: varchar("parent_slug", { length: 80 }),
  icon: varchar("icon", { length: 16 }).notNull().default("pill"),
  description: text("description").notNull().default(""),
  image: varchar("image", { length: 200 }).notNull().default(""),
  sort: integer("sort").notNull().default(0),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  brandSlug: varchar("brand_slug", { length: 80 }).notNull(),
  categorySlug: varchar("category_slug", { length: 80 }).notNull(),
  rootSlug: varchar("root_slug", { length: 80 }).notNull(),
  price: integer("price").notNull(),
  oldPrice: integer("old_price"),
  rating: real("rating").notNull().default(4.5),
  reviewCount: integer("review_count").notNull().default(0),
  sold: integer("sold").notNull().default(0),
  stock: integer("stock").notNull().default(10),
  image: varchar("image", { length: 200 }).notNull(),
  shortDesc: text("short_desc").notNull().default(""),
  description: jsonb("description").$type<string[]>().notNull().default([]),
  specs: jsonb("specs").$type<{ label: string; value: string }[]>().notNull().default([]),
  variants: jsonb("variants").$type<{ label: string; options: string[] }[]>().notNull().default([]),
  usage: text("usage").notNull().default(""),
  warning: text("warning").notNull().default(""),
  faq: jsonb("faq").$type<{ q: string; a: string }[]>().notNull().default([]),
  isNew: boolean("is_new").notNull().default(false),
  isBestseller: boolean("is_bestseller").notNull().default(false),
  isFeatured: boolean("is_featured").notNull().default(false),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productSlug: varchar("product_slug", { length: 120 }).notNull(),
  author: varchar("author", { length: 80 }).notNull(),
  rating: integer("rating").notNull(),
  title: varchar("title", { length: 160 }).notNull().default(""),
  body: text("body").notNull(),
  pros: jsonb("pros").$type<string[]>().notNull().default([]),
  cons: jsonb("cons").$type<string[]>().notNull().default([]),
  verified: boolean("verified").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  metaTitle: varchar("meta_title", { length: 200 }).notNull(),
  metaDescription: text("meta_description").notNull(),
  excerpt: text("excerpt").notNull(),
  cover: varchar("cover", { length: 200 }).notNull(),
  categorySlug: varchar("category_slug", { length: 80 }).notNull(),
  categoryTitle: varchar("category_title", { length: 120 }).notNull(),
  author: varchar("author", { length: 80 }).notNull(),
  readMinutes: integer("read_minutes").notNull().default(6),
  publishedAt: varchar("published_at", { length: 40 }).notNull(),
  blocks: jsonb("blocks")
    .$type<{ type: "h2" | "h3" | "p" | "ul" | "note"; text?: string; items?: string[] }[]>()
    .notNull()
    .default([]),
  faq: jsonb("faq").$type<{ q: string; a: string }[]>().notNull().default([]),
  related: jsonb("related").$type<string[]>().notNull().default([]),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 24 }).notNull().unique(),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 24 }).notNull(),
  province: varchar("province", { length: 60 }).notNull(),
  city: varchar("city", { length: 60 }).notNull(),
  address: text("address").notNull(),
  postalCode: varchar("postal_code", { length: 20 }).notNull().default(""),
  shippingMethod: varchar("shipping_method", { length: 40 }).notNull(),
  paymentMethod: varchar("payment_method", { length: 40 }).notNull(),
  note: text("note").notNull().default(""),
  items: jsonb("items")
    .$type<{ slug: string; name: string; image: string; price: number; qty: number }[]>()
    .notNull()
    .default([]),
  subtotal: integer("subtotal").notNull(),
  discount: integer("discount").notNull().default(0),
  shipping: integer("shipping").notNull().default(0),
  total: integer("total").notNull(),
  status: varchar("status", { length: 40 }).notNull().default("در حال پردازش"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  kind: varchar("kind", { length: 24 }).notNull().default("contact"),
  name: varchar("name", { length: 120 }).notNull().default(""),
  phone: varchar("phone", { length: 24 }).notNull().default(""),
  email: varchar("email", { length: 120 }).notNull().default(""),
  subject: varchar("subject", { length: 160 }).notNull().default(""),
  body: text("body").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
