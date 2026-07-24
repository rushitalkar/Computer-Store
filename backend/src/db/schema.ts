import { pgTable,text,timestamp,uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users",
    {
        email : text("email").unique().notNull(),
        id : text("id").primaryKey(),
        name : text("name"),
        imageUrl : text("img_url"),
        created_at : timestamp("created_at",{mode:"date"}).notNull().defaultNow(),
        updated_at : timestamp("updated_at",{mode:"date"}).notNull().defaultNow().$onUpdate(() => new Date()),


    }
    
)





export const products = pgTable("products",{
    id : uuid("id").defaultRandom().primaryKey(),
    title : text("title").notNull(),
    description : text("description").notNull(),
    imageUrl : text("img_url").notNull(),
   userId : text("user_id").notNull().references(()=> users.id , {onDelete : "cascade"}),
   created_at : timestamp("created_at",{mode:"date"}).notNull().defaultNow(),
   updated_at : timestamp("updated_at",{mode:"date"}).notNull().defaultNow(),

})

export const comments = pgTable("comments", {
       id : uuid("id").defaultRandom().primaryKey(),
       content : text("content").notNull(),
       userId : text("user_id").notNull().references(()=> users.id , {onDelete : "cascade"}),
       productId : uuid("user_id").notNull().references(()=> products.id , {onDelete : "cascade"}),
       created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),


})


export const userRelation = relations(users ,({many})=>( {
    products : many(products),
    comments : many(comments)
}))

export const productRelation =  relations(products , ({one,many})=>({
     comments : many(comments),
     user : one(users ,{fields :[products.userId], references : [users.id]}),

}))

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;


export type Product = typeof products.$inferSelect;
export type NewProduct = typeof users.$inferInsert;


export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof users.$inferInsert;

