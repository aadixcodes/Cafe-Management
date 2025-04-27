
// import React from 'react';
// import { PageLayout } from '@/components/layout/PageLayout';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Switch } from '@/components/ui/switch';

// export default function SettingsPage() {
//   return (
//     <PageLayout>
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold mb-2">Settings</h1>
//         <p className="text-cafe-text-muted">Customize your cafe management experience</p>
//       </div>
      
//       <div className="grid gap-6">
//         <Card className="bg-[#1B1B23] glass-panel card-shadow">
//           <CardHeader>
//             <CardTitle>Profile Settings</CardTitle>
//             <CardDescription>Manage your account details and preferences</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form className="grid gap-6">
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="name">Full Name</Label>
//                   <Input id="name" placeholder="John Doe" className="bg-cafe-background border-cafe-border" />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="email">Email Address</Label>
//                   <Input id="email" placeholder="john@example.com" className="bg-cafe-background border-cafe-border" />
//                 </div>
//               </div>
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="role">Role</Label>
//                   <Input id="role" placeholder="Cafe Manager" className="bg-cafe-background border-cafe-border" />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="phone">Phone Number</Label>
//                   <Input id="phone" placeholder="+1 234 567 890" className="bg-cafe-background border-cafe-border" />
//                 </div>
//               </div>
//               <Button className="w-full md:w-auto bg-cafe-accent hover:bg-cafe-accent-light button-glow">
//                 Update Profile
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
        
//         <Card className="bg-[#1B1B23] glass-panel card-shadow">
//           <CardHeader>
//             <CardTitle>Application Settings</CardTitle>
//             <CardDescription>Customize your dashboard experience</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h4 className="font-medium">Dark Mode</h4>
//                   <p className="text-sm text-cafe-text-muted">Use dark theme throughout the application</p>
//                 </div>
//                 <Switch defaultChecked />
//               </div>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h4 className="font-medium">Email Notifications</h4>
//                   <p className="text-sm text-cafe-text-muted">Receive email notifications for important events</p>
//                 </div>
//                 <Switch defaultChecked />
//               </div>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h4 className="font-medium">Auto Refresh Dashboard</h4>
//                   <p className="text-sm text-cafe-text-muted">Automatically refresh dashboard data every 5 minutes</p>
//                 </div>
//                 <Switch />
//               </div>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h4 className="font-medium">Compact Tables</h4>
//                   <p className="text-sm text-cafe-text-muted">Display tables in compact mode to fit more data</p>
//                 </div>
//                 <Switch />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card className="bg-[#1B1B23] glass-panel card-shadow">
//           <CardHeader>
//             <CardTitle>Security</CardTitle>
//             <CardDescription>Manage your account security settings</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form className="grid gap-6">
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="current-password">Current Password</Label>
//                   <Input id="current-password" type="password" className="bg-cafe-background border-cafe-border" />
//                 </div>
//                 <div />
//                 <div className="grid gap-2">
//                   <Label htmlFor="new-password">New Password</Label>
//                   <Input id="new-password" type="password" className="bg-cafe-background border-cafe-border" />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="confirm-password">Confirm New Password</Label>
//                   <Input id="confirm-password" type="password" className="bg-cafe-background border-cafe-border" />
//                 </div>
//               </div>
//               <Button className="w-full md:w-auto bg-cafe-accent hover:bg-cafe-accent-light button-glow">
//                 Change Password
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </PageLayout>
//   );
// }



import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AuthenticationPage() {
  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Authentication</h1>
        <p className="text-cafe-text-muted">Update your login credentials</p>
      </div>
      
      <Card className="bg-[#1B1B23] glass-panel card-shadow">
        <CardHeader>
          <CardTitle>Change Credentials</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  placeholder="Enter new username" 
                  className="bg-cafe-background border-cafe-border" 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input 
                  id="current-password" 
                  type="password" 
                  className="bg-cafe-background border-cafe-border" 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input 
                  id="new-password" 
                  type="password" 
                  className="bg-cafe-background border-cafe-border" 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  className="bg-cafe-background border-cafe-border" 
                />
              </div>
            </div>
            
            <Button className="w-full md:w-auto bg-cafe-accent hover:bg-cafe-accent-light button-glow">
              Update Credentials
            </Button>
          </form>
        </CardContent>
      </Card>
    </PageLayout>
  );
}