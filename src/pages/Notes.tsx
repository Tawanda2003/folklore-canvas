import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNotes, Note } from '@/hooks/useNotes';
import { Trash2, Plus, Edit3, Save } from 'lucide-react';
import { format } from 'date-fns';

const Notes = () => {
  const { notes, loading, createNote, updateNote, deleteNote } = useNotes();
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', content: '' });

  const handleCreateNote = async () => {
    try {
      const newNote = await createNote();
      if (newNote) {
        setEditingNote(newNote.id);
        setEditForm({ title: newNote.title, content: newNote.content });
      }
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note.id);
    setEditForm({ title: note.title, content: note.content });
  };

  const handleSaveNote = async () => {
    if (!editingNote) return;
    
    try {
      await updateNote(editingNote, editForm);
      setEditingNote(null);
      setEditForm({ title: '', content: '' });
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setEditForm({ title: '', content: '' });
  };

  const handleDeleteNote = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        if (editingNote === id) {
          setEditingNote(null);
          setEditForm({ title: '', content: '' });
        }
      } catch (error) {
        // Error handled in hook
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading notes...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Notes</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage your personal notes
          </p>
        </div>
        <Button onClick={handleCreateNote} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Note
        </Button>
      </div>

      {notes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Edit3 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first note to get started
            </p>
            <Button onClick={handleCreateNote}>
              <Plus className="h-4 w-4 mr-2" />
              Create Note
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <Card key={note.id} className="flex flex-col">
              <CardHeader className="pb-3">
                {editingNote === note.id ? (
                  <Input
                    value={editForm.title}
                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Note title..."
                    className="font-semibold"
                  />
                ) : (
                  <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                )}
                <div className="text-sm text-muted-foreground">
                  {format(new Date(note.updated_at), 'MMM d, yyyy • h:mm a')}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {editingNote === note.id ? (
                  <div className="space-y-4 flex-1">
                    <Textarea
                      value={editForm.content}
                      onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Write your note here..."
                      className="min-h-[120px] resize-none flex-1"
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleSaveNote}
                        size="sm"
                        className="flex-1"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button 
                        onClick={handleCancelEdit}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 flex-1">
                    <p className="text-sm text-muted-foreground flex-1 line-clamp-6">
                      {note.content || 'No content yet...'}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEditNote(note)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteNote(note.id)}
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;