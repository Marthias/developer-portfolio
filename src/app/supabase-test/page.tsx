// import { supabase } from "../../lib/supabase/client";

// export default async function SupabaseTestPage() {
//   const { data: projects, error: readError } = await supabase
//     .from("projects")
//     .select("id, title, slug, status")
//     .order("created_at", { ascending: false });

//   // const { data: insertedProject, error: insertError } = await supabase
//   //   .from("projects")
//   //   .insert({
//   //     title: "Anonymous Attack Test",
//   //     slug: "anonymous-attack-test",
//   //     short_description: "Temporary RLS security test.",
//   //     description: "This should NOT be allowed.",
//   //     status: "completed",
//   //   })
//   //   .select()
//   //   .single();

//   return (
//     <main className="min-h-screen p-8">
//       <h1 className="text-2xl font-bold">
//         Supabase Security Test
//       </h1>

//       <section className="mt-8">
//         <h2 className="text-xl font-semibold">
//           Projects I can read
//         </h2>

//         {readError ? (
//           <pre className="mt-4 whitespace-pre-wrap">
//             {readError.message}
//           </pre>
//         ) : (
//           <pre className="mt-4 whitespace-pre-wrap">
//             {JSON.stringify(projects, null, 2)}
//           </pre>
//         )}
//       </section>

//       {/* <section className="mt-8">
//         <h2 className="text-xl font-semibold">
//           Anonymous INSERT Test
//         </h2>

//         <pre className="mt-4 whitespace-pre-wrap">
//           {JSON.stringify(
//             {
//               success: !insertError,
//               insertedProject,
//               error: insertError?.message ?? null,
//             },
//             null,
//             2
//           )}
//         </pre>
//       </section> */}
//     </main>
//   );
// }