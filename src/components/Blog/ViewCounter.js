"use client";
import React, { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'

// Only create Supabase client if environment variables are available
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  : null;

const ViewCounter = ({ slug, noCount = false, showCount = true }) => {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const incrementView = async () => {
      // Skip if Supabase is not configured
      if (!supabase) {
        console.warn("Supabase not configured - skipping view increment");
        return;
      }

      try {
        let { error } = await supabase.rpc("increment", {
          slug_text:slug ,
        });

        if (error){
            console.error("Error incrementing view count inside try block:", error)
        };
        
      } catch (error) {
        console.error(
          "An error occurred while incrementing the view count:",
          error
        );
      }
    };

    if(!noCount){
        incrementView();
    }
  }, [slug, noCount]);

  useEffect(() => {
    const getViews = async () => {
      // Skip if Supabase is not configured
      if (!supabase) {
        console.warn("Supabase not configured - skipping view count fetch");
        setViews(0); // Set to 0 when Supabase is not available
        return;
      }

      try {
        let { data, error } = await supabase
  .from('views')
  .select('count')
  .match({slug: slug})
  .single()

        if (error){
            console.error("Error fetching view count inside try block:", error)
        };


        setViews(data ? data.count : 0)
        
      } catch (error) {
        console.error(
          "An error occurred while fetching the view count:",
          error
        );
      }
    };

        getViews();
  }, [slug]);

  if (showCount) {
    return <div>{views} views</div>;
  } else {
    return null;
  }
};

export default ViewCounter;
