import { useState } from "react";
import { Link } from "react-router-dom";

type Post = { 
    _id: string; 
    title: string; 
    description: string; 
    createdAt: string 
};

type ArchiveProps = {
    posts: Post[];
};

const Archive = ({posts} : ArchiveProps) => {
    const [expandedYear, setExpandedYear] = useState<number | null>(null);

    const archive = posts.reduce((acc: Record<number, Record<number, Post[]>>, post) => {
        const date = new Date(post.createdAt);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 1-12
        if (!acc[year]) {
          acc[year] = {};
        }
        if (!acc[year][month]) {
          acc[year][month] = [];
        }
        acc[year][month].push(post);
        return acc;
      }, {} as Record<number, Record<number, Post[]>>);
    
      return (
        <div className="archive">
          <h2>Arkiv</h2>
          {Object.keys(archive)
            .map(Number)
            .sort((a, b) => b - a)
            .map((year) => (
              <div key={year}>
               <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setExpandedYear(expandedYear === year ? null : year);
              }}
            >
              {year}
            </a>

                {expandedYear === year && (
                  <ul>
                    {Object.keys(archive[year])
                      .map(Number)
                      .sort((a, b) => b - a)
                      .map((month) => (
                        <li key={month}>
                          <Link to={`/archive/${year}/${month}`}>
                            {new Date(year, month - 1).toLocaleString("sv-SE", {
                              month: "long",
                            })}
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
        </div>
      );
};

export default Archive;