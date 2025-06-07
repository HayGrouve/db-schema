// Export all tables
export * from "./sportpredict";
export * from "./recipes-share";

// You can add more exports or utility functions here
export const schemaVersion = "1.4.0";

// Add relations here if needed
// Example:
// import { relations } from 'drizzle-orm';
// import { posts } from './posts';
// import { users } from './users';
//
// export const postsRelations = relations(posts, ({ one }) => ({
//   author: one(users, {
//     fields: [posts.userId],
//     references: [users.id],
//   }),
// }));
