ALTER TABLE `users` ALTER COLUMN "username" TO "username" text(2);--> statement-breakpoint
ALTER TABLE `users` ADD `password` text NOT NULL;