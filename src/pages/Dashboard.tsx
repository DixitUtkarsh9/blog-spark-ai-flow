
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart, MessageSquare, FileText, Clock, Filter, Search, Plus, MoreHorizontal, ExternalLink, Eye, ThumbsUp, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Dummy data for the dashboard
const recentBlogs = [
  {
    id: '1',
    title: 'Top 10 SEO Strategies for E-commerce Websites',
    status: 'published',
    date: '2025-04-04',
    views: 342,
    likes: 28,
    comments: 7,
    thumbnail: '/placeholder.svg',
  },
  {
    id: '2',
    title: 'Content Marketing Trends to Watch in 2025',
    status: 'published',
    date: '2025-04-02',
    views: 215,
    likes: 19,
    comments: 4,
    thumbnail: '/placeholder.svg',
  },
  {
    id: '3',
    title: 'How to Optimize Your LinkedIn Profile for Better Visibility',
    status: 'in-progress',
    date: '2025-04-06',
    progress: 65,
    currentStep: 'editing',
    thumbnail: '/placeholder.svg',
  },
  {
    id: '4',
    title: 'The Ultimate Guide to Google Analytics 5',
    status: 'approval',
    date: '2025-04-05',
    progress: 85,
    thumbnail: '/placeholder.svg',
  },
  {
    id: '5',
    title: 'How Artificial Intelligence is Changing Digital Marketing',
    status: 'draft',
    date: '2025-04-01',
    progress: 40,
    currentStep: 'content',
    thumbnail: '/placeholder.svg',
  },
];

// Sample analytics data
const analyticsData = {
  blogPerformance: [
    { name: 'Mon', views: 240, likes: 15 },
    { name: 'Tue', views: 300, likes: 20 },
    { name: 'Wed', views: 280, likes: 18 },
    { name: 'Thu', views: 320, likes: 25 },
    { name: 'Fri', views: 380, likes: 32 },
    { name: 'Sat', views: 290, likes: 21 },
    { name: 'Sun', views: 260, likes: 17 },
  ],
  contentDistribution: [
    { name: 'SEO', value: 35 },
    { name: 'Content Marketing', value: 25 },
    { name: 'Social Media', value: 20 },
    { name: 'Email Marketing', value: 15 },
    { name: 'Other', value: 5 },
  ]
};

// Dashboard component
const Dashboard = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter blogs based on status and search term
  const filteredBlogs = recentBlogs.filter(blog => {
    const matchesFilter = filter === 'all' || blog.status === filter;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full">
      <div className="container py-10">
        <Tabs defaultValue="blogs" className="w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">Dashboard</h1>
              <p className="text-muted-foreground">Manage your content and track performance</p>
            </div>
            <TabsList className="bg-muted/30">
              <TabsTrigger value="blogs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <FileText className="h-4 w-4 mr-2" />
                Blogs
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <BarChart className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="blogs" className="mt-0">
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 input-gradient"
                />
              </div>
              <div className="flex gap-3">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[180px] bg-muted/30 border-muted/50">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All blogs</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="in-progress">In progress</SelectItem>
                    <SelectItem value="approval">Pending approval</SelectItem>
                    <SelectItem value="draft">Drafts</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="btn-gradient">
                  <Plus className="h-4 w-4 mr-2" />
                  New Blog
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <Card key={blog.id} className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
                  <div 
                    className="h-32 bg-cover bg-center"
                    style={{ backgroundImage: `url(${blog.thumbnail})` }}
                  />
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        {blog.status === 'published' ? (
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 mb-2">
                            Published
                          </div>
                        ) : blog.status === 'in-progress' ? (
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 mb-2">
                            In Progress
                          </div>
                        ) : blog.status === 'approval' ? (
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-500/10 text-orange-500 mb-2">
                            Pending Approval
                          </div>
                        ) : (
                          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground mb-2">
                            Draft
                          </div>
                        )}
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Publish</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {blog.date}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    {blog.status === 'in-progress' || blog.status === 'approval' || blog.status === 'draft' ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span>{blog.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted/30 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                            style={{ width: `${blog.progress}%` }}
                          ></div>
                        </div>
                        {blog.currentStep && (
                          <div className="text-xs text-muted-foreground">
                            Current step: <span className="text-foreground">{blog.currentStep}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-muted-foreground" /> 
                          <span>{blog.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4 text-muted-foreground" /> 
                          <span>{blog.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" /> 
                          <span>{blog.comments}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter>
                    {blog.status === 'published' ? (
                      <Button variant="outline" className="w-full" asChild>
                        <a href="#">
                          View on LinkedIn
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    ) : blog.status === 'approval' ? (
                      <Button className="w-full btn-gradient">
                        Approve & Publish
                      </Button>
                    ) : blog.status === 'in-progress' ? (
                      <Button variant="outline" className="w-full">
                        Check Progress
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full">
                        Continue Editing
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
              
              {/* Empty state */}
              {filteredBlogs.length === 0 && (
                <div className="col-span-full glass-card p-8 rounded-xl text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/70" />
                  <h3 className="text-lg font-medium mb-2">No blogs found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? "No blogs match your search criteria" : "You haven't created any blogs yet"}
                  </p>
                  <Button className="btn-gradient">
                    <Plus className="h-4 w-4 mr-2" />
                    Create your first blog
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="px-6 py-5 border-b border-border/50">
                  <h3 className="font-medium">Content Overview</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Total Blogs', value: '12', icon: FileText, color: 'text-primary' },
                      { label: 'Published', value: '8', icon: ExternalLink, color: 'text-green-500' },
                      { label: 'Total Views', value: '2.4k', icon: Eye, color: 'text-blue-500' },
                      { label: 'Engagement', value: '18%', icon: ThumbsUp, color: 'text-orange-500' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-muted/20 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="h-8 w-8 rounded-md flex items-center justify-center bg-background">
                            <stat.icon className={cn("h-4 w-4", stat.color)} />
                          </div>
                        </div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Performance Chart */}
              <div className="glass-card rounded-xl overflow-hidden col-span-1 lg:col-span-2">
                <div className="px-6 py-5 border-b border-border/50 flex justify-between items-center">
                  <h3 className="font-medium">Blog Performance</h3>
                  <Select defaultValue="7days">
                    <SelectTrigger className="w-[140px] h-8 text-xs bg-muted/30 border-muted/50">
                      <SelectValue placeholder="Time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-6 h-80 flex items-center justify-center">
                  <div className="text-muted-foreground text-center">
                    <BarChart className="h-10 w-10 mx-auto mb-2" />
                    <p>Performance chart visualization</p>
                    <p className="text-xs">(Chart would render here in actual implementation)</p>
                  </div>
                </div>
              </div>
              
              {/* Content Distribution */}
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="px-6 py-5 border-b border-border/50">
                  <h3 className="font-medium">Content Categories</h3>
                </div>
                <div className="p-6 h-80 flex items-center justify-center">
                  <div className="text-muted-foreground text-center">
                    <PieChart className="h-10 w-10 mx-auto mb-2" />
                    <p>Content distribution visualization</p>
                    <p className="text-xs">(Chart would render here in actual implementation)</p>
                  </div>
                </div>
              </div>
              
              {/* Top Performing Blogs */}
              <div className="glass-card rounded-xl overflow-hidden col-span-1 lg:col-span-2">
                <div className="px-6 py-5 border-b border-border/50">
                  <h3 className="font-medium">Top Performing Blogs</h3>
                </div>
                <div className="divide-y divide-border/50">
                  {recentBlogs
                    .filter(blog => blog.status === 'published')
                    .slice(0, 3)
                    .map((blog, i) => (
                      <div key={blog.id} className="px-6 py-4 flex items-center gap-4">
                        <div className="font-bold text-xl text-muted-foreground">{i + 1}</div>
                        <div className="flex-1">
                          <h4 className="font-medium line-clamp-1">{blog.title}</h4>
                          <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" /> {blog.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3" /> {blog.likes}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
