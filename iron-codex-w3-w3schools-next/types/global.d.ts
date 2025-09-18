// Ambient global fallback for Slug
// If a file defines its own `type Slug = ...`, that will shadow this.
// This prevents 'Cannot find name "Slug"' where Slug wasn't defined.
declare type Slug = string;
