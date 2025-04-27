CREATE TABLE `blog_tag` (
	`code` text PRIMARY KEY NOT NULL,
	`label` text(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `blogs` (
	`blog_id` text PRIMARY KEY NOT NULL,
	`title` text(256) NOT NULL,
	`file_name` text(256) NOT NULL,
	`file_key` text(256) NOT NULL,
	`publish` integer DEFAULT false,
	`md_url` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `blogTagMapping` (
	`blog_id` text NOT NULL,
	`tag_code` text NOT NULL,
	FOREIGN KEY (`blog_id`) REFERENCES `blogs`(`blog_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_code`) REFERENCES `blog_tag`(`code`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `medias` (
	`temp_blog_id` text PRIMARY KEY NOT NULL,
	`file_name` text NOT NULL,
	`media_url` text NOT NULL,
	`blog_id` text,
	FOREIGN KEY (`blog_id`) REFERENCES `blogs`(`blog_id`) ON UPDATE no action ON DELETE cascade
);
