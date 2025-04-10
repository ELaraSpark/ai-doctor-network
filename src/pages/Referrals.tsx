import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Share2, Gift, Star, Zap, Users, Mail, Linkedin, Twitter, CheckCircle } from 'lucide-react'; // Added CheckCircle
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const Referrals = () => {
  const { toast } = useToast();
  const referralCode = "REF123XYZ";
  const referralLink = `https://leny.ai/register?ref=${referralCode}`;
  const creditsEarned = 0;
  const successfulReferrals = 0;

  const rewardTiers = [
    { threshold: 1, reward: "10 Credits", icon: Gift },
    { threshold: 3, reward: "+30 Bonus Credits", icon: Gift },
    { threshold: 5, reward: "Unlock Advanced Summarization", icon: Zap },
    { threshold: 10, reward: "1 Month Pro Plan Free", icon: Star },
  ];

  const nextTier = rewardTiers.find(tier => tier.threshold > successfulReferrals) || rewardTiers[rewardTiers.length - 1];
  const progressPercentage = nextTier ? (successfulReferrals / nextTier.threshold) * 100 : 100;

  const handleCopyCode = () => { /* ... (same) ... */
    navigator.clipboard.writeText(referralCode);
    toast({ title: "Copied!", description: "Referral code copied to clipboard." });
   };
  const handleCopyLink = () => { /* ... (same) ... */
    navigator.clipboard.writeText(referralLink);
    toast({ title: "Copied!", description: "Referral link copied to clipboard." });
   };
  const handleShare = async () => { /* ... (same) ... */
    const shareData = {
      title: 'Check out Leny.ai!',
      text: `I'm using Leny.ai to streamline my clinical workflow. Sign up with my code ${referralCode} or link and we both get free credits!`,
      url: referralLink,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast({ title: "Shared successfully!" });
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
            console.error('Error sharing:', err);
            toast({ title: "Share failed", description: err.message, variant: "destructive" });
        }
      }
    } else {
      handleCopyLink();
      toast({ title: "Link Copied", description: "Web Share not supported. Referral link copied instead." });
    }
   };

  return (
    // <AppLayout> // Removed AppLayout wrapper
      <div className="p-4 sm:p-6 lg:p-8 space-y-8"> {/* Increased spacing */}
        <h1 className="text-3xl font-bold text-gray-900">Referrals</h1>

        {/* Main Referral Card */}
        <Card className="shadow-lg border-primary/20">
          {/* Removed gradient background from header */}
          <CardHeader className="p-6 rounded-t-lg"> 
            <div className="flex items-center gap-3">
                <Gift size={24} className="text-primary" />
                <CardTitle className="text-xl">Refer Colleagues, Earn Rewards!</CardTitle>
            </div>
            <CardDescription className="text-base pt-1"> {/* Increased font size */}
              Share Leny.ai and you both get <span className="font-semibold text-primary">10 free credits</span> when they sign up using your link or code.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 grid md:grid-cols-2 gap-6">
            {/* Left Side: Code/Link */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="referralCode" className="text-sm font-medium">Your Referral Code</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input id="referralCode" value={referralCode} readOnly className="bg-muted font-mono text-sm h-10" />
                  <Button variant="outline" size="icon" onClick={handleCopyCode} aria-label="Copy code" className="h-10 w-10">
                    <Copy size={16} />
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="referralLink" className="text-sm font-medium">Your Referral Link</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input id="referralLink" value={referralLink} readOnly className="bg-muted text-sm h-10" />
                  <Button variant="outline" size="icon" onClick={handleCopyLink} aria-label="Copy link" className="h-10 w-10">
                    <Copy size={16} />
                  </Button>
                </div>
              </div>
            </div>
            {/* Right Side: Share Buttons */}
            <div className="space-y-3">
               <p className="text-sm font-medium">Share directly:</p>
               <div className="flex flex-wrap gap-2">
                 <Button onClick={handleShare} variant="outline" className="flex-1 min-w-[120px]">
                    <Share2 size={16} className="mr-2" /> Share Link...
                 </Button>
                 <Button variant="outline" size="icon" asChild aria-label="Share via Email">
                    <a href={`mailto:?subject=${encodeURIComponent('Check out Leny.ai!')}&body=${encodeURIComponent(`I'm using Leny.ai to streamline my clinical workflow. Sign up with my code ${referralCode} or this link: ${referralLink}`)}`}>
                      <Mail size={18} />
                    </a>
                 </Button>
                 <Button variant="outline" size="icon" asChild aria-label="Share on LinkedIn">
                   <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`} target="_blank" rel="noopener noreferrer">
                     <Linkedin size={18} />
                   </a>
                 </Button>
                 <Button variant="outline" size="icon" asChild aria-label="Share on Twitter">
                   <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(`Check out Leny.ai for clinical workflows! Use my referral link:`)}`} target="_blank" rel="noopener noreferrer">
                     <Twitter size={18} />
                   </a>
                 </Button>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats and Milestones Card */}
        <Card className="shadow-sm border"> {/* Added subtle shadow and border */}
           <CardHeader>
              <CardTitle className="text-lg">Your Progress & Milestones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               {/* Stack stats vertically by default, grid on sm+ */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4 text-center border-b pb-6">
                  <div>
                     <p className="text-3xl font-bold">{successfulReferrals}</p>
                     <p className="text-sm text-muted-foreground">Successful Referrals</p>
                 </div>
                 <div>
                    <p className="text-3xl font-bold">{creditsEarned}</p>
                    <p className="text-sm text-muted-foreground">Credits Earned</p>
                 </div>
              </div>
              <div>
                 <h4 className="text-sm font-semibold mb-4">Referral Milestones</h4>
                 <div className="space-y-4">
                    {rewardTiers.map((tier, index) => (
                       <div key={index} className="flex items-center gap-3 text-sm">
                          <div className={`flex h-6 w-6 rounded-full items-center justify-center shrink-0 ${successfulReferrals >= tier.threshold ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                             {successfulReferrals >= tier.threshold ? <CheckCircle size={14} /> : <tier.icon size={14} />}
                          </div>
                          <div className="flex-1">
                             <span>Refer <span className="font-medium">{tier.threshold}</span> colleague{tier.threshold > 1 ? 's' : ''}</span>
                             <span className="block text-xs text-muted-foreground">Reward: <span className="font-medium text-primary">{tier.reward}</span></span>
                          </div>
                       </div>
                    ))}
                 </div>
                 {nextTier && successfulReferrals < rewardTiers[rewardTiers.length - 1].threshold && ( // Show progress until last tier reached
                    <div className="mt-6">
                       <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Progress to next reward ({nextTier.reward})</span>
                          <span>{successfulReferrals}/{nextTier.threshold}</span>
                       </div>
                       <Progress value={progressPercentage} className="h-2" />
                    </div>
                 )}
              </div>
           </CardContent>
        </Card>

      </div>
    // </AppLayout> // Removed AppLayout wrapper
  );
};

export default Referrals;
