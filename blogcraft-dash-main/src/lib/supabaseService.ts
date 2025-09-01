import { supabase } from "@/integrations/supabase/client";

/**
 * Publish a post to the Supabase `posts` table and link tags.
 * This is a best-effort helper: on error it returns null and leaves
 * the local mock data untouched so the admin UI still works.
 */
export async function publishToSupabase(postData: any) {
  try {
    // Try to find current user id (optional)
    const userResp = await supabase.auth.getUser();
    const author_id = userResp?.data?.user?.id ?? "";

    // Resolve category id if category looks like a slug
    let category_id: string | null = null;
    if (postData.category) {
      const { data: catData, error: catErr } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", postData.category)
        .limit(1)
        .maybeSingle();
      if (!catErr && catData?.id) category_id = catData.id as string;
    }

    const insertPayload: any = {
      author_id: author_id || "",
      category_id: category_id,
      title: postData.title,
      slug: postData.slug,
      content: postData.content || "",
      excerpt: postData.excerpt || null,
      featured_image_url: postData.featuredImage || null,
      status: postData.status || "draft",
      meta_title: postData.metaTitle || null,
      meta_description: postData.metaDescription || null,
      meta_keywords: postData.metaKeywords?.length ? postData.metaKeywords : null,
      published_at: postData.status === "published" ? new Date().toISOString() : null,
      scheduled_at: postData.status === "scheduled" ? postData.scheduledAt || null : null,
    };

    const { data: inserted, error } = await supabase
      .from("posts")
      .insert(insertPayload)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Supabase insert error:", error);
      return null;
    }

    // Link tags (upsert tags and then insert into post_tags)
    if (postData.tags?.length && inserted?.id) {
      for (const tagName of postData.tags) {
        const slug = tagName.toLowerCase().replace(/\s+/g, "-");
        // Upsert tag
        const { data: tagRow, error: tagErr } = await supabase
          .from("tags")
          .upsert({ name: tagName, slug })
          .select()
          .maybeSingle();
        if (tagErr) {
          console.warn("Tag upsert error:", tagErr);
          continue;
        }

        const tagId = tagRow?.id;
        if (tagId) {
          await supabase.from("post_tags").insert({ post_id: inserted.id, tag_id: tagId });
        }
      }
    }

    return inserted;
  } catch (err) {
    console.error("publishToSupabase failed:", err);
    return null;
  }
}
