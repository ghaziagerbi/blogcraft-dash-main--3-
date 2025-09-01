import { useState, useRef } from "react";
import { 
  Upload, 
  Grid3X3, 
  List, 
  Search, 
  Filter, 
  MoreVertical, 
  Download, 
  Trash2, 
  Copy,
  Eye,
  Calendar,
  FileText,
  Image as ImageIcon,
  Video,
  File
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: string;
  uploadedAt: string;
  dimensions?: string;
  fileSize: number;
}

const mockMediaItems: MediaItem[] = [
  {
    id: '1',
    name: 'hero-image.jpg',
    url: '/lovable-uploads/b0c00b55-d393-495d-b9e7-ca27a59bd8cf.png',
    type: 'image',
    size: '2.4 MB',
    uploadedAt: '2024-01-15',
    dimensions: '1920x1080',
    fileSize: 2400000
  },
  {
    id: '2',
    name: 'blog-post-1.jpg',
    url: '/placeholder.svg',
    type: 'image',
    size: '1.2 MB',
    uploadedAt: '2024-01-14',
    dimensions: '800x600',
    fileSize: 1200000
  },
  {
    id: '3',
    name: 'presentation.pdf',
    url: '#',
    type: 'document',
    size: '3.1 MB',
    uploadedAt: '2024-01-13',
    fileSize: 3100000
  },
  {
    id: '4',
    name: 'video-tutorial.mp4',
    url: '#',
    type: 'video',
    size: '15.7 MB',
    uploadedAt: '2024-01-12',
    dimensions: '1280x720',
    fileSize: 15700000
  }
];

export default function Media() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(mockMediaItems);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const newItem: MediaItem = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' : 
              file.type.startsWith('video/') ? 'video' : 'document',
        size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
        uploadedAt: new Date().toISOString().split('T')[0],
        fileSize: file.size
      };

      setMediaItems(prev => [newItem, ...prev]);
    });

    toast({
      title: "Files uploaded successfully",
      description: `${files.length} file(s) have been uploaded to your media library.`,
    });
  };

  const handleDelete = (id: string) => {
    setMediaItems(prev => prev.filter(item => item.id !== id));
    setSelectedItems(prev => prev.filter(item => item !== id));
    toast({
      title: "File deleted",
      description: "The file has been removed from your media library.",
    });
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copied",
      description: "The file URL has been copied to your clipboard.",
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">
            Manage your media files, images, and documents
          </p>
        </div>
        <Button onClick={() => fileInputRef.current?.click()}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Files
        </Button>
      </div>

      {/* Upload input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf,.doc,.docx"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Filters and Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search media files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-1 border rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Media Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-3">
                <div className="relative aspect-square mb-3 bg-secondary rounded-lg overflow-hidden">
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {getFileIcon(item.type)}
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleCopyUrl(item.url)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy URL
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(item.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium truncate" title={item.name}>
                    {item.name}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{item.size}</span>
                    <span>{item.uploadedAt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                    {item.type === 'image' ? (
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      getFileIcon(item.type)
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{item.size}</span>
                      {item.dimensions && <span>{item.dimensions}</span>}
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {item.uploadedAt}
                      </span>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleCopyUrl(item.url)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy URL
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(item.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-sm font-medium text-muted-foreground">No media files found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {searchTerm || filterType !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by uploading your first file.'
            }
          </p>
        </div>
      )}
    </div>
  );
}
