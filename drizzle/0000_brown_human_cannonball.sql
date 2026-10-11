CREATE TABLE `coach_records` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`kind` text NOT NULL,
	`day` text NOT NULL,
	`data` text NOT NULL,
	`photo_key` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `coach_user_day` ON `coach_records` (`user_id`,`day`);