// src/app/dashboard/testimonials/page.tsx
'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Testimonial } from '@/types';
import apiClient from '../../lib/apiCLient';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AxiosError } from 'axios'; // Import AxiosError

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [editName, setEditName] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editMessage, setEditMessage] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await apiClient.get<Testimonial[]>('/testimonials');
        setTestimonials(response.data);
      } catch (err) {
        const axiosError = err as AxiosError; // Berikan tipe yang spesifik
        setError(axiosError.response?.status === 401 ? 'Unauthorized. Please login again.' : 'Failed to fetch testimonials.');
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchTestimonials();
  }, [token]);

  useEffect(() => {
    if (selectedTestimonial) {
      setEditName(selectedTestimonial.name);
      setEditTitle(selectedTestimonial.title);
      setEditMessage(selectedTestimonial.message);
    }
  }, [selectedTestimonial]);

  const handleEditClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setEditDialogOpen(true);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedTestimonial) return;

    const updatedData = {
      name: editName,
      title: editTitle,
      message: editMessage,
    };

    try {
      const response = await apiClient.put<Testimonial>(`/testimonials/${selectedTestimonial.id}`, updatedData);
      setTestimonials(
        testimonials.map((t) => (t.id === selectedTestimonial.id ? response.data : t))
      );
      setEditDialogOpen(false);
    } catch (err) {
      const axiosError = err as AxiosError; // Berikan tipe yang spesifik
      setError(axiosError.response?.status === 401 ? 'Unauthorized. Please login again.' : 'Failed to update testimonial.');
    }
  };

  const handleDelete = async (testimonialId: number) => {
    try {
      await apiClient.delete(`/testimonials/${testimonialId}`);
      setTestimonials(testimonials.filter((t) => t.id !== testimonialId));
    } catch (err) {
      const axiosError = err as AxiosError; // Berikan tipe yang spesifik
      setError(axiosError.response?.status === 401 ? 'Unauthorized. Please login again.' : 'Failed to delete testimonial.');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await apiClient.post<Testimonial>('/testimonials', { name, title, message });
      setTestimonials([response.data, ...testimonials]);
      setName('');
      setTitle('');
      setMessage('');
    } catch (err) {
      const axiosError = err as AxiosError; // Berikan tipe yang spesifik
      setError(axiosError.response?.status === 401 ? 'Unauthorized. Please login again.' : 'Failed to create testimonial.');
    }
  };

  if (loading) return <p>Loading...</p>;
  // ... sisa komponen Anda tidak berubah
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Testimonials</h1>
      <Card>
        <CardHeader>
          <CardTitle>Add New Testimonial</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Author Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
            </div>
            <Button type="submit">Add Testimonial</Button>
          </form>
        </CardContent>
      </Card>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Card>
        <CardHeader>
          <CardTitle>Existing Testimonials</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>{testimonial.name}</TableCell>
                  <TableCell>{testimonial.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{testimonial.message}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" onClick={() => handleEditClick(testimonial)}>Edit</Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the testimonial.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(testimonial.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Author Name</Label>
              <Input id="edit-name" value={editName} onChange={(e) => setEditName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input id="edit-title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-message">Message</Label>
              <Textarea id="edit-message" value={editMessage} onChange={(e) => setEditMessage(e.target.value)} required />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}