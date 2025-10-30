import React, { useState, useEffect, useRef } from 'react';

const MyAccount = () => {
  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // Initialize state from localStorage
  const getInitialState = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  // State management
  const [orders, setOrders] = useState(() => getInitialState('orders', [
    {
      id: 1,
      image: 'https://via.placeholder.com/80',
      name: 'Wireless Headphones',
      price: 2499,
      status: 'Delivered',
      date: '2025-06-10',
      deliveryMonth: 'June 2025'
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/80',
      name: 'Smart Watch',
      price: 5999,
      status: 'Delivered',
      date: '2025-09-15',
      deliveryMonth: 'September 2025'
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/80',
      name: 'Running Shoes',
      price: 3499,
      status: 'Delivered',
      date: '2025-10-17',
      deliveryMonth: 'October 2025'
    }
  ]));

  const [wishlist, setWishlist] = useState(() => getInitialState('wishlist', [
    { id: 1, image: 'https://via.placeholder.com/150', name: 'Laptop Backpack', price: 1299 },
    { id: 2, image: 'https://via.placeholder.com/150', name: 'Bluetooth Speaker', price: 1999 },
    { id: 3, image: 'https://via.placeholder.com/150', name: 'Phone Case', price: 499 },
    { id: 4, image: 'https://via.placeholder.com/150', name: 'Power Bank', price: 1599 }
  ]));

  const [addresses, setAddresses] = useState(() => getInitialState('addresses', [
    { id: 1, type: 'Home', address: '123 Main Street, Apartment 4B, Mumbai, Maharashtra - 400001' },
    { id: 2, type: 'Office', address: '456 Business Park, Floor 3, Bangalore, Karnataka - 560001' }
  ]));

  const [userProfile, setUserProfile] = useState(() => getInitialState('userProfile', {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    avatar: localStorage.getItem('profilePicture') || 'https://via.placeholder.com/100'
  }));

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(() => 
    getInitialState('selectedPaymentMethod', null)
  );

  const [cart, setCart] = useState(() => getInitialState('cart', []));

  // Modal states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPaymentMethodSelector, setShowPaymentMethodSelector] = useState(false);
  const [showPaymentFormModal, setShowPaymentFormModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  
  const [confirmModalData, setConfirmModalData] = useState({
    title: '', message: '', type: '', onConfirm: null, itemName: ''
  });
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState('');
  const [editingAddress, setEditingAddress] = useState(null);
  
  // Form states
  const [profileForm, setProfileForm] = useState({ ...userProfile });
  const [addressForm, setAddressForm] = useState({ type: '', address: '' });
  const [passwordForm, setPasswordForm] = useState({ 
    currentPassword: '', newPassword: '', confirmPassword: '' 
  });
  
  // Payment form states
  const [paymentForm, setPaymentForm] = useState({
    type: '', cardNumber: '', cardHolder: '', expiryDate: '', cvv: '',
    upiId: '', bankName: '', accountNumber: '', ifscCode: '',
    walletType: '', mobileNumber: ''
  });

  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Refs
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);

  // Payment method types
  const paymentMethodTypes = [
    { id: 'creditCard', name: 'Credit Card', icon: '💳', description: 'Visa, Mastercard, Amex' },
    { id: 'debitCard', name: 'Debit Card', icon: '💳', description: 'All major banks' },
    { id: 'upi', name: 'UPI', icon: '📱', description: 'Google Pay, PhonePe, Paytm' },
    { id: 'netBanking', name: 'Net Banking', icon: '🏦', description: 'All banks supported' },
    { id: 'wallet', name: 'Digital Wallet', icon: '👛', description: 'PayPal, Amazon Pay' },
    { id: 'cod', name: 'Cash on Delivery', icon: '💵', description: 'Pay when delivered' }
  ];

  // Load GSAP and Anime.js
  useEffect(() => {
    const loadScripts = () => {
      const scripts = [
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js'
      ];

      let scriptsLoaded = 0;

      scripts.forEach((src) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          scriptsLoaded++;
          if (scriptsLoaded === scripts.length) {
            initAnimations();
          }
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => {
          scriptsLoaded++;
          if (scriptsLoaded === scripts.length) {
            initAnimations();
          }
        };
        document.body.appendChild(script);
      });
    };

    loadScripts();

    return () => {
      // Cleanup
    };
  }, []);

  // Initialize animations
  const initAnimations = () => {
    if (hasAnimated.current || !window.gsap || !window.anime) return;
    hasAnimated.current = true;

    // GSAP Animations
    window.gsap.registerPlugin(window.ScrollTrigger);

    // Fade in header
    window.gsap.from('.profile-header', {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power3.out'
    });

    // Animate sections on scroll
    window.gsap.utils.toArray('.account-section').forEach((section, index) => {
      window.gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.1
      });
    });

    // Anime.js card animations
    if (document.querySelectorAll('.order-card').length > 0) {
      window.anime({
        targets: '.order-card',
        translateY: [20, 0],
        opacity: [0, 1],
        delay: window.anime.stagger(100),
        duration: 800,
        easing: 'easeOutCubic'
      });
    }
  };

  // Save to localStorage
  useEffect(() => { localStorage.setItem('orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('addresses', JSON.stringify(addresses)); }, [addresses]);
  useEffect(() => { localStorage.setItem('userProfile', JSON.stringify(userProfile)); }, [userProfile]);
  useEffect(() => { localStorage.setItem('selectedPaymentMethod', JSON.stringify(selectedPaymentMethod)); }, [selectedPaymentMethod]);
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);

  // Group orders by month
  const groupOrdersByMonth = () => {
    const grouped = {};
    orders.forEach(order => {
      const month = order.deliveryMonth || 'Unknown';
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push(order);
    });
    return grouped;
  };

  // Helper functions
  const showConfirmation = (title, message, type, onConfirm, itemName = '') => {
    setConfirmModalData({ title, message, type, onConfirm, itemName });
    setShowConfirmModal(true);
  };

  const handleConfirmAction = () => {
    if (confirmModalData.onConfirm) confirmModalData.onConfirm();
    setShowConfirmModal(false);
  };

  const getConfirmIcon = (type) => {
    switch(type) {
      case 'delete': return '🗑️';
      case 'logout': return '🚪';
      case 'remove': return '❌';
      case 'addToCart': return '🛒';
      default: return '❓';
    }
  };

  const handleGoBack = () => window.history.back();

  // Image compression
  const compressImage = (file, maxWidth = 400, maxHeight = 400, quality = 0.7) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size too large. Please select an image smaller than 5MB.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    try {
      const compressedBase64 = await compressImage(file, 400, 400, 0.7);
      const sizeInMB = (compressedBase64.length * 0.75) / (1024 * 1024);
      
      if (sizeInMB > 2) {
        alert('Compressed image is still too large. Please select a smaller image.');
        return;
      }

      try {
        localStorage.setItem('profilePicture', compressedBase64);
        setUserProfile(prev => ({ ...prev, avatar: compressedBase64 }));
        setProfileForm(prev => ({ ...prev, avatar: compressedBase64 }));
        alert('Profile picture updated successfully!');
      } catch (storageError) {
        if (storageError.name === 'QuotaExceededError') {
          alert('Storage quota exceeded. Try clearing some browser data or use a smaller image.');
        } else {
          alert('Failed to save profile picture. Please try again.');
        }
      }
    } catch (error) {
      alert('Failed to process image. Please try another image.');
    }
  };

  const handleChangeProfilePicture = () => fileInputRef.current?.click();

  const handleRemoveProfilePicture = () => {
    const defaultAvatar = 'https://via.placeholder.com/100';
    try {
      localStorage.setItem('profilePicture', defaultAvatar);
      setUserProfile(prev => ({ ...prev, avatar: defaultAvatar }));
      setProfileForm(prev => ({ ...prev, avatar: defaultAvatar }));
      alert('Profile picture removed successfully!');
    } catch (error) {
      console.error('Error removing profile picture:', error);
    }
  };

  // Event Handlers
  const handleEditProfile = () => {
    setProfileForm({ ...userProfile });
    setShowProfileModal(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserProfile({ ...profileForm });
    setShowProfileModal(false);
    alert('Profile updated successfully!');
  };

  const handleViewOrderDetails = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    setSelectedOrder(order);
    setShowOrderDetailsModal(true);
  };

  const handleAddToCart = (itemId) => {
    const item = wishlist.find(w => w.id === itemId);
    showConfirmation('Add to Cart', `Do you want to add "${item.name}" to your cart?`, 'addToCart', () => {
      setCart([...cart, item]);
      alert(`"${item.name}" added to cart!`);
    }, item.name);
  };

  const handleRemoveFromWishlist = (itemId) => {
    const item = wishlist.find(w => w.id === itemId);
    showConfirmation('Remove from Wishlist', `Are you sure you want to remove "${item.name}" from your wishlist?`, 'remove', () => {
      setWishlist(wishlist.filter(w => w.id !== itemId));
      alert(`"${item.name}" removed from wishlist!`);
    }, item.name);
  };

  const handleEditAddress = (addressId) => {
    const address = addresses.find(a => a.id === addressId);
    setEditingAddress(addressId);
    setAddressForm({ type: address.type, address: address.address });
    setShowAddressModal(true);
  };

  const handleDeleteAddress = (addressId) => {
    const address = addresses.find(a => a.id === addressId);
    showConfirmation('Delete Address', `Are you sure you want to delete this ${address.type} address?`, 'delete', () => {
      setAddresses(addresses.filter(a => a.id !== addressId));
      alert('Address deleted successfully!');
    });
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setAddressForm({ type: '', address: '' });
    setShowAddressModal(true);
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (editingAddress) {
      setAddresses(addresses.map(a => 
        a.id === editingAddress ? { ...a, type: addressForm.type, address: addressForm.address } : a
      ));
      alert('Address updated successfully!');
    } else {
      const newAddress = {
        id: Math.max(...addresses.map(a => a.id), 0) + 1,
        type: addressForm.type,
        address: addressForm.address
      };
      setAddresses([...addresses, newAddress]);
      alert('Address added successfully!');
    }
    setShowAddressModal(false);
    setAddressForm({ type: '', address: '' });
  };

  const handleChangePassword = () => {
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordModal(true);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    alert('Password changed successfully!');
    setShowPasswordModal(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleAddPaymentMethod = () => setShowPaymentMethodSelector(true);

  const handleSelectPaymentType = (type) => {
    setSelectedPaymentType(type);
    setPaymentForm({ ...paymentForm, type });
    setShowPaymentMethodSelector(false);
    setShowPaymentFormModal(true);
  };

  const handleSavePaymentMethod = (e) => {
    e.preventDefault();
    let newPaymentMethod = { type: paymentForm.type };
    
    switch(selectedPaymentType) {
      case 'creditCard':
      case 'debitCard':
        newPaymentMethod = {
          ...newPaymentMethod,
          displayType: selectedPaymentType === 'creditCard' ? 'Credit Card' : 'Debit Card',
          cardNumber: '**** **** **** ' + paymentForm.cardNumber.slice(-4),
          cardHolder: paymentForm.cardHolder,
          expiryDate: paymentForm.expiryDate
        };
        break;
      case 'upi':
        newPaymentMethod = { ...newPaymentMethod, displayType: 'UPI', upiId: paymentForm.upiId };
        break;
      case 'netBanking':
        newPaymentMethod = {
          ...newPaymentMethod,
          displayType: 'Net Banking',
          bankName: paymentForm.bankName,
          accountNumber: '**** ' + paymentForm.accountNumber.slice(-4)
        };
        break;
      case 'wallet':
        newPaymentMethod = {
          ...newPaymentMethod,
          displayType: 'Digital Wallet',
          walletType: paymentForm.walletType,
          mobileNumber: paymentForm.mobileNumber
        };
        break;
      case 'cod':
        newPaymentMethod = { ...newPaymentMethod, displayType: 'Cash on Delivery' };
        break;
      default:
        break;
    }
    
    setSelectedPaymentMethod(newPaymentMethod);
    setShowPaymentFormModal(false);
    setPaymentForm({
      type: '', cardNumber: '', cardHolder: '', expiryDate: '', cvv: '',
      upiId: '', bankName: '', accountNumber: '', ifscCode: '',
      walletType: '', mobileNumber: ''
    });
    alert('Payment method saved successfully!');
  };

  const handleDeletePaymentMethod = () => {
    showConfirmation('Delete Payment Method', 'Are you sure you want to delete this payment method?', 'delete', () => {
      setSelectedPaymentMethod(null);
      alert('Payment method deleted successfully!');
    });
  };

  const handleLogout = () => {
    showConfirmation('Logout', 'Are you sure you want to logout from your account?', 'logout', () => {
      localStorage.setItem('isLoggedIn', 'false');
      setIsLoggedIn(false);
      alert('Logged out successfully!');
      setTimeout(() => {
        alert('Demo: Click OK to simulate login.');
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
      }, 1500);
    });
  };

  const groupedOrders = groupOrdersByMonth();

  // Login required screen
  if (!isLoggedIn) {
    return (
      <div style={{
        width: '100%',
        minHeight: '100vh',
        background: '#fdf8f0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        fontFamily: "'Georgia', serif"
      }}>
        <div style={{
          background: '#fff',
          padding: '60px 40px',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%',
          border: '2px solid #b99a6b'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔒</div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#5c544b',
            marginBottom: '16px',
            fontFamily: "'Georgia', serif"
          }}>Login Required</h1>
          <p style={{
            fontSize: '16px',
            color: '#5c544b',
            lineHeight: '1.6',
            marginBottom: '32px'
          }}>
            Please log in to access your account dashboard.
          </p>
          <button
            style={{
              background: '#c97b63',
              color: '#fff',
              border: 'none',
              padding: '14px 32px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(201, 123, 99, 0.3)',
              width: '100%',
              fontFamily: "'Georgia', serif"
            }}
            onClick={() => {
              localStorage.setItem('isLoggedIn', 'true');
              setIsLoggedIn(true);
            }}
          >
            Login Now
          </button>
        </div>
      </div>
    );
  }

  // Main styles with Home.jsx colors
 const styles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    background: '#fdf8f0',
    padding: '40px 20px',
    fontFamily: "'Georgia', serif",
    boxSizing: 'border-box',
    overflowY: 'auto',
    scrollbarWidth: 'none',        // Firefox
    msOverflowStyle: 'none'        // IE and Edge
  },
  innerWrapper: {
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%'
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#fff',
    color: '#5c544b',
    border: '2px solid #b99a6b',
    padding: '12px 20px',
    marginLeft: '-180px',
    marginBottom: '20px',
    position: 'relative',
    left: 0,
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    width: 'fit-content',
    fontFamily: "'Georgia', serif"
  },
  backButtonHover: {
    background: '#c97b63',
    color: '#fff',
    transform: 'translateX(-4px)',
    boxShadow: '0 4px 12px rgba(201, 123, 99, 0.3)',
    borderColor: '#c97b63'
  },
  profileHeader: {
    background: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '24px',
    position: 'relative',
    overflow: 'hidden',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    border: '2px solid #b99a6b'
  },
  profileInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    position: 'relative',
    zIndex: 1
  },
    avatarWrapper: {
      position: 'relative'
    },
    avatar: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      overflow: 'hidden',
      border: '3px solid #b99a6b',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      position: 'relative'
    },
    avatarImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    avatarOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(92, 84, 75, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      cursor: 'pointer',
      borderRadius: '50%'
    },
    avatarOverlayHover: {
      opacity: 1
    },
    avatarText: {
      color: '#fff',
      fontSize: '12px',
      fontWeight: '600',
      textAlign: 'center'
    },
    fileInput: {
      display: 'none'
    },
    userDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    },
    userName: {
      margin: 0,
      fontSize: '32px',
      fontWeight: '700',
      color: '#5c544b',
      letterSpacing: '-0.5px',
      fontFamily: "'Georgia', serif"
    },
    userEmail: {
      margin: 0,
      color: '#5c544b',
      fontSize: '15px',
      fontWeight: '500'
    },
    userPhone: {
      margin: 0,
      color: '#5c544b',
      fontSize: '15px',
      fontWeight: '500'
    },
    btnPrimary: {
      background: '#c97b63',
      color: '#fff',
      border: 'none',
      padding: '14px 32px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(201, 123, 99, 0.3)',
      position: 'relative',
      zIndex: 1,
      fontFamily: "'Georgia', serif"
    },
    btnPrimaryHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(201, 123, 99, 0.4)',
      background: '#d88c75'
    },
    accountContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    accountSection: {
      background: '#fff',
      padding: '32px',
      borderRadius: '8px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
      border: '1px solid rgba(185, 154, 107, 0.2)'
    },
    sectionTitle: {
      margin: '0 0 24px 0',
      fontSize: '24px',
      fontWeight: '700',
      color: '#5c544b',
      paddingBottom: '16px',
      borderBottom: '2px solid #b99a6b',
      fontFamily: "'Georgia', serif"
    },
    monthGroup: {
      marginBottom: '32px'
    },
    monthTitle: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#c97b63',
      marginBottom: '16px',
      paddingLeft: '12px',
      borderLeft: '4px solid #c97b63',
      fontFamily: "'Georgia', serif"
    },
    ordersList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    orderCard: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      padding: '20px',
      border: '2px solid rgba(185, 154, 107, 0.3)',
      borderRadius: '6px',
      transition: 'all 0.3s ease',
      background: '#fff',
      flexWrap: 'wrap'
    },
    orderCardHover: {
      borderColor: '#b99a6b',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-2px)'
    },
    orderImage: {
      width: '80px',
      height: '80px',
      objectFit: 'cover',
      borderRadius: '6px',
      border: '2px solid #b99a6b'
    },
    orderInfo: {
      flex: '1',
      minWidth: '200px'
    },
    orderName: {
      margin: '0 0 8px 0',
      fontSize: '17px',
      color: '#5c544b',
      fontWeight: '600',
      fontFamily: "'Georgia', serif"
    },
    orderPrice: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#c97b63',
      margin: '4px 0'
    },
    orderDate: {
      fontSize: '13px',
      color: '#5c544b',
      margin: '4px 0',
      opacity: 0.7
    },
    orderStatusSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '12px'
    },
    orderStatus: {
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '700',
      textTransform: 'uppercase'
    },
    statusDelivered: {
      background: '#d4fc79',
      color: '#166534'
    },
    statusInTransit: {
      background: '#ffecd2',
      color: '#9a3412'
    },
    statusProcessing: {
      background: '#c2e9fb',
      color: '#1e40af'
    },
    btnSecondary: {
      background: '#fff',
      color: '#c97b63',
      border: '2px solid #c97b63',
      padding: '10px 24px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      fontFamily: "'Georgia', serif"
    },
    btnSecondaryHover: {
      background: '#c97b63',
      color: '#fff',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(201, 123, 99, 0.3)'
    },
    wishlistGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gap: '24px'
    },
    wishlistCard: {
      border: '2px solid rgba(185, 154, 107, 0.3)',
      borderRadius: '6px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      background: '#fff'
    },
    wishlistCardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
      borderColor: '#b99a6b'
    },
    wishlistImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover'
    },
    wishlistInfo: {
      padding: '20px'
    },
    wishlistName: {
      margin: '0 0 8px 0',
      fontSize: '16px',
      color: '#5c544b',
      fontWeight: '600',
      fontFamily: "'Georgia', serif"
    },
    wishlistPrice: {
      fontSize: '22px',
      fontWeight: '700',
      color: '#c97b63',
      margin: '8px 0 16px 0'
    },
    wishlistActions: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    btnSmall: {
      padding: '10px 20px',
      fontSize: '13px'
    },
    btnFull: {
      width: '100%'
    },
    btnRemove: {
      background: '#fff',
      color: '#ef4444',
      border: '2px solid #ef4444',
      padding: '10px 20px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      width: '100%',
      fontFamily: "'Georgia', serif"
    },
    btnRemoveHover: {
      background: '#ef4444',
      color: '#fff',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
    },
    addressesList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    addressCard: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px',
      border: '2px solid rgba(185, 154, 107, 0.3)',
      borderRadius: '6px',
      transition: 'all 0.3s ease',
      background: '#fff',
      flexWrap: 'wrap',
      gap: '16px'
    },
    addressCardHover: {
      borderColor: '#b99a6b',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
      transform: 'translateX(4px)'
    },
    addressInfo: {
      flex: '1',
      minWidth: '250px'
    },
    addressType: {
      margin: '0 0 10px 0',
      fontSize: '18px',
      fontWeight: '700',
      color: '#c97b63',
      fontFamily: "'Georgia', serif"
    },
    addressText: {
      margin: 0,
      color: '#5c544b',
      fontSize: '14px',
      lineHeight: '1.7'
    },
    addressActions: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    },
    btnAddAddress: {
      width: '100%',
      background: 'rgba(185, 154, 107, 0.1)',
      color: '#b99a6b',
      border: '2px dashed #b99a6b',
      padding: '20px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '700',
      transition: 'all 0.3s ease',
      fontFamily: "'Georgia', serif"
    },
    btnAddAddressHover: {
      background: 'rgba(185, 154, 107, 0.2)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(185, 154, 107, 0.3)'
    },
    savedPaymentCard: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px',
      border: '2px solid rgba(185, 154, 107, 0.3)',
      borderRadius: '6px',
      background: '#fff',
      transition: 'all 0.3s ease',
      flexWrap: 'wrap',
      gap: '16px'
    },
    savedPaymentInfo: {
      flex: 1,
      minWidth: '200px'
    },
    savedPaymentType: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#c97b63',
      marginBottom: '8px',
      fontFamily: "'Georgia', serif"
    },
    savedPaymentDetails: {
      fontSize: '14px',
      color: '#5c544b',
      margin: '4px 0'
    },
    paymentCardActions: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    },
    btnAddPayment: {
      width: '100%',
      background: 'rgba(185, 154, 107, 0.1)',
      color: '#b99a6b',
      border: '2px dashed #b99a6b',
      padding: '20px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '700',
      transition: 'all 0.3s ease',
      fontFamily: "'Georgia', serif"
    },
    settingsActions: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '16px'
    },
    btnSetting: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '16px',
      padding: '20px 24px',
      background: '#fff',
      border: '2px solid rgba(185, 154, 107, 0.3)',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      color: '#5c544b',
      transition: 'all 0.3s ease',
      textAlign: 'left',
      fontFamily: "'Georgia', serif"
    },
    btnSettingHover: {
      background: '#c97b63',
      borderColor: '#c97b63',
      color: '#fff',
      transform: 'translateX(4px)',
      boxShadow: '0 6px 16px rgba(201, 123, 99, 0.3)'
    },
    btnSettingHoverLogout: {
      background: '#ef4444',
      borderColor: '#ef4444',
      color: '#fff',
      transform: 'translateX(4px)',
      boxShadow: '0 6px 16px rgba(239, 68, 68, 0.3)'
    },
    icon: {
      fontSize: '24px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#5c544b',
      fontSize: '16px',
      fontWeight: '500',
      opacity: 0.6
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(8px)',
      padding: '20px',
      overflowY: 'auto'
    },
    modalContent: {
      background: '#fff',
      padding: '40px',
      borderRadius: '8px',
      maxWidth: '500px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      margin: 'auto',
      border: '2px solid #b99a6b'
    },
    modalHeader: {
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '24px',
      color: '#5c544b',
      borderBottom: '2px solid #b99a6b',
      paddingBottom: '16px',
      fontFamily: "'Georgia', serif"
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#5c544b'
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      fontSize: '15px',
      border: '2px solid rgba(185, 154, 107, 0.3)',
      borderRadius: '6px',
      boxSizing: 'border-box',
      transition: 'all 0.3s ease',
      fontFamily: "'Georgia', serif",
      color: '#5c544b'
    },
    select: {
      width: '100%',
      padding: '14px 16px',
      fontSize: '15px',
      border: '2px solid rgba(185, 154, 107, 0.3)',
      borderRadius: '6px',
      boxSizing: 'border-box',
      transition: 'all 0.3s ease',
      fontFamily: "'Georgia', serif",
      color: '#5c544b',
      cursor: 'pointer'
    },
    textarea: {
      width: '100%',
      padding: '14px 16px',
      fontSize: '15px',
      border: '2px solid rgba(185, 154, 107, 0.3)',
      borderRadius: '6px',
      boxSizing: 'border-box',
      minHeight: '100px',
      resize: 'vertical',
      fontFamily: "'Georgia', serif",
      transition: 'all 0.3s ease',
      color: '#5c544b'
    },
    modalActions: {
      display: 'flex',
      gap: '12px',
      marginTop: '28px',
      justifyContent: 'flex-end',
      flexWrap: 'wrap'
    },
    btnCancel: {
      backgroundColor: '#fff',
      color: '#5c544b',
      border: '2px solid rgba(185, 154, 107, 0.3)',
      padding: '12px 28px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      fontFamily: "'Georgia', serif"
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'
    },
    confirmModalContent: {
      background: '#fff',
      padding: '40px',
      borderRadius: '8px',
      maxWidth: '450px',
      width: '100%',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      textAlign: 'center',
      margin: 'auto',
      border: '2px solid #b99a6b'
    },
    confirmIcon: {
      fontSize: '64px',
      marginBottom: '20px',
      display: 'block'
    },
    confirmTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#5c544b',
      marginBottom: '12px',
      fontFamily: "'Georgia', serif"
    },
    confirmMessage: {
      fontSize: '16px',
      color: '#5c544b',
      lineHeight: '1.6',
      marginBottom: '32px'
    },
    confirmActions: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    btnConfirm: {
      background: '#c97b63',
      color: '#fff',
      border: 'none',
      padding: '14px 32px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(201, 123, 99, 0.3)',
      fontFamily: "'Georgia', serif"
    },
    btnConfirmDelete: {
      background: '#ef4444',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
    },
    orderDetailsContent: {
      background: '#fff',
      padding: '40px',
      borderRadius: '8px',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      margin: 'auto',
      border: '2px solid #b99a6b'
    },
    orderDetailImage: {
      width: '100%',
      maxWidth: '200px',
      height: 'auto',
      borderRadius: '6px',
      margin: '20px auto',
      display: 'block',
      border: '2px solid #b99a6b'
    },
    orderDetailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '16px 0',
      borderBottom: '1px solid rgba(185, 154, 107, 0.3)'
    },
    orderDetailLabel: {
      fontSize: '15px',
      fontWeight: '600',
      color: '#5c544b'
    },
    orderDetailValue: {
      fontSize: '15px',
      fontWeight: '600',
      color: '#5c544b',
      textAlign: 'right'
    },
    paymentMethodGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '16px',
      marginBottom: '20px'
    },
    paymentMethodCard: {
      padding: '24px',
      border: '2px solid rgba(185, 154, 107, 0.3)',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      background: '#fff'
    },
    paymentMethodCardHover: {
      borderColor: '#b99a6b',
      background: 'rgba(185, 154, 107, 0.05)',
      transform: 'translateY(-4px)',
      boxShadow: '0 6px 16px rgba(185, 154, 107, 0.2)'
    },
    paymentMethodIcon: {
      fontSize: '48px',
      marginBottom: '12px'
    },
    paymentMethodName: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#5c544b',
      marginBottom: '6px',
      fontFamily: "'Georgia', serif"
    },
    paymentMethodDesc: {
      fontSize: '12px',
      color: '#5c544b',
      opacity: 0.7
    },
    profilePictureActions: {
      display: 'flex',
      gap: '8px',
      marginTop: '12px'
    },
    btnSmallText: {
      background: '#c97b63',
      color: '#fff',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      fontFamily: "'Georgia', serif"
    }
  };

  const getOrderStatusStyle = (status) => {
    const baseStyle = styles.orderStatus;
    switch (status) {
      case 'Delivered':
        return { ...baseStyle, ...styles.statusDelivered };
      case 'In Transit':
        return { ...baseStyle, ...styles.statusInTransit };
      case 'Processing':
        return { ...baseStyle, ...styles.statusProcessing };
      default:
        return baseStyle;
    }
  };

  return (
    <div ref={containerRef} style={styles.container}>
      <div style={styles.innerWrapper}>
        {/* Back Button */}
        <button 
          style={{
            ...styles.backButton,
            ...(hoveredButton === 'back' ? styles.backButtonHover : {})
          }}
          onMouseEnter={() => setHoveredButton('back')}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={handleGoBack}
        >
          <span style={{ fontSize: '18px' }}>←</span>
          Back
        </button>

        {/* Profile Header */}
        <header className="profile-header" style={styles.profileHeader}>
          <div style={styles.profileInfo}>
            <div style={styles.avatarWrapper}>
              <div 
                style={styles.avatar}
                onMouseEnter={() => setHoveredButton('avatar')}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={handleChangeProfilePicture}
              >
                <img src={userProfile.avatar} alt="User Avatar" style={styles.avatarImage} />
                <div 
                  style={{
                    ...styles.avatarOverlay,
                    ...(hoveredButton === 'avatar' ? styles.avatarOverlayHover : {})
                  }}
                >
                  <span style={styles.avatarText}>Change<br/>Picture</span>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={styles.fileInput}
                onChange={handleProfilePictureChange}
              />
              <div style={styles.profilePictureActions}>
                <button 
                  style={styles.btnSmallText}
                  onClick={handleChangeProfilePicture}
                >
                  Upload
                </button>
                <button 
                  style={{...styles.btnSmallText, background: '#ef4444'}}
                  onClick={handleRemoveProfilePicture}
                >
                  Remove
                </button>
              </div>
            </div>
            <div style={styles.userDetails}>
              <h1 style={styles.userName}>{userProfile.name}</h1>
              <p style={styles.userEmail}>{userProfile.email}</p>
              <p style={styles.userPhone}>{userProfile.phone}</p>
            </div>
          </div>
          <button 
            style={{
              ...styles.btnPrimary,
              ...(hoveredButton === 'editProfile' ? styles.btnPrimaryHover : {})
            }}
            onMouseEnter={() => setHoveredButton('editProfile')}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
        </header>

        {/* Main Content */}
        <div style={styles.accountContent}>
          {/* My Orders Section */}
          <section className="account-section" style={styles.accountSection}>
            <h2 style={styles.sectionTitle}>My Orders</h2>
            {Object.keys(groupedOrders).length === 0 ? (
              <div style={styles.emptyState}>No orders yet</div>
            ) : (
              Object.keys(groupedOrders).sort().reverse().map(month => (
                <div key={month} style={styles.monthGroup}>
                  <h3 style={styles.monthTitle}>{month}</h3>
                  <div style={styles.ordersList}>
                    {groupedOrders[month].map((order) => (
                      <div 
                        key={order.id} 
                        className="order-card"
                        style={{
                          ...styles.orderCard,
                          ...(hoveredCard === `order-${order.id}` ? styles.orderCardHover : {})
                        }}
                        onMouseEnter={() => setHoveredCard(`order-${order.id}`)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <img src={order.image} alt={order.name} style={styles.orderImage} />
                        <div style={styles.orderInfo}>
                          <h3 style={styles.orderName}>{order.name}</h3>
                          <p style={styles.orderPrice}>₹{order.price}</p>
                          <p style={styles.orderDate}>{order.date}</p>
                        </div>
                        <div style={styles.orderStatusSection}>
                          <span style={getOrderStatusStyle(order.status)}>
                            {order.status}
                          </span>
                          <button 
                            style={{
                              ...styles.btnSecondary,
                              ...(hoveredButton === `order-${order.id}` ? styles.btnSecondaryHover : {})
                            }}
                            onMouseEnter={() => setHoveredButton(`order-${order.id}`)}
                            onMouseLeave={() => setHoveredButton(null)}
                            onClick={() => handleViewOrderDetails(order.id)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </section>

          {/* Wishlist Section */}
          <section className="account-section" style={styles.accountSection}>
            <h2 style={styles.sectionTitle}>Wishlist</h2>
            {wishlist.length === 0 ? (
              <div style={styles.emptyState}>Your wishlist is empty</div>
            ) : (
              <div style={styles.wishlistGrid}>
                {wishlist.map((item) => (
                  <div 
                    key={item.id}
                    style={{
                      ...styles.wishlistCard,
                      ...(hoveredCard === `wishlist-${item.id}` ? styles.wishlistCardHover : {})
                    }}
                    onMouseEnter={() => setHoveredCard(`wishlist-${item.id}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <img src={item.image} alt={item.name} style={styles.wishlistImage} />
                    <div style={styles.wishlistInfo}>
                      <h3 style={styles.wishlistName}>{item.name}</h3>
                      <p style={styles.wishlistPrice}>₹{item.price}</p>
                      <div style={styles.wishlistActions}>
                        <button 
                          style={{
                            ...styles.btnPrimary,
                            ...styles.btnSmall,
                            ...styles.btnFull,
                            ...(hoveredButton === `cart-${item.id}` ? styles.btnPrimaryHover : {})
                          }}
                          onMouseEnter={() => setHoveredButton(`cart-${item.id}`)}
                          onMouseLeave={() => setHoveredButton(null)}
                          onClick={() => handleAddToCart(item.id)}
                        >
                          Add to Cart
                        </button>
                        <button 
                          style={{
                            ...styles.btnRemove,
                            ...(hoveredButton === `remove-${item.id}` ? styles.btnRemoveHover : {})
                          }}
                          onMouseEnter={() => setHoveredButton(`remove-${item.id}`)}
                          onMouseLeave={() => setHoveredButton(null)}
                          onClick={() => handleRemoveFromWishlist(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Addresses Section */}
          <section className="account-section" style={styles.accountSection}>
            <h2 style={styles.sectionTitle}>Saved Addresses</h2>
            <div style={styles.addressesList}>
              {addresses.length === 0 ? (
                <div style={styles.emptyState}>No saved addresses</div>
              ) : (
                addresses.map((addr) => (
                  <div 
                    key={addr.id}
                    style={{
                      ...styles.addressCard,
                      ...(hoveredCard === `address-${addr.id}` ? styles.addressCardHover : {})
                    }}
                    onMouseEnter={() => setHoveredCard(`address-${addr.id}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div style={styles.addressInfo}>
                      <h3 style={styles.addressType}>{addr.type}</h3>
                      <p style={styles.addressText}>{addr.address}</p>
                    </div>
                    <div style={styles.addressActions}>
                      <button 
                        style={{
                          ...styles.btnSecondary,
                          ...styles.btnSmall,
                          ...(hoveredButton === `edit-${addr.id}` ? styles.btnSecondaryHover : {})
                        }}
                        onMouseEnter={() => setHoveredButton(`edit-${addr.id}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                        onClick={() => handleEditAddress(addr.id)}
                      >
                        Edit
                      </button>
                      <button 
                        style={{
                          ...styles.btnRemove,
                          ...styles.btnSmall,
                          ...(hoveredButton === `delete-${addr.id}` ? styles.btnRemoveHover : {})
                        }}
                        onMouseEnter={() => setHoveredButton(`delete-${addr.id}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                        onClick={() => handleDeleteAddress(addr.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
              <button 
                style={{
                  ...styles.btnAddAddress,
                  ...(hoveredButton === 'addAddress' ? styles.btnAddAddressHover : {})
                }}
                onMouseEnter={() => setHoveredButton('addAddress')}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={handleAddNewAddress}
              >
                + Add New Address
              </button>
            </div>
          </section>

          {/* Payment Method Section */}
          <section className="account-section" style={styles.accountSection}>
            <h2 style={styles.sectionTitle}>Payment Method</h2>
            {selectedPaymentMethod ? (
              <div style={styles.savedPaymentCard}>
                <div style={styles.savedPaymentInfo}>
                  <div style={styles.savedPaymentType}>{selectedPaymentMethod.displayType}</div>
                  {selectedPaymentMethod.cardNumber && (
                    <>
                      <div style={styles.savedPaymentDetails}>{selectedPaymentMethod.cardNumber}</div>
                      <div style={styles.savedPaymentDetails}>{selectedPaymentMethod.cardHolder}</div>
                      <div style={styles.savedPaymentDetails}>Expires: {selectedPaymentMethod.expiryDate}</div>
                    </>
                  )}
                  {selectedPaymentMethod.upiId && (
                    <div style={styles.savedPaymentDetails}>{selectedPaymentMethod.upiId}</div>
                  )}
                  {selectedPaymentMethod.bankName && (
                    <>
                      <div style={styles.savedPaymentDetails}>{selectedPaymentMethod.bankName}</div>
                      <div style={styles.savedPaymentDetails}>{selectedPaymentMethod.accountNumber}</div>
                    </>
                  )}
                  {selectedPaymentMethod.walletType && (
                    <>
                      <div style={styles.savedPaymentDetails}>{selectedPaymentMethod.walletType}</div>
                      <div style={styles.savedPaymentDetails}>{selectedPaymentMethod.mobileNumber}</div>
                    </>
                  )}
                  {selectedPaymentMethod.displayType === 'Cash on Delivery' && (
                    <div style={styles.savedPaymentDetails}>Pay when order is delivered</div>
                  )}
                </div>
                <div style={styles.paymentCardActions}>
                  <button 
                    style={{...styles.btnSecondary, ...styles.btnSmall}}
                    onClick={handleAddPaymentMethod}
                  >
                    Change
                  </button>
                  <button 
                    style={{...styles.btnRemove, ...styles.btnSmall}}
                    onClick={handleDeletePaymentMethod}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <button 
                style={styles.btnAddPayment}
                onClick={handleAddPaymentMethod}
              >
                + Add Payment Method
              </button>
            )}
          </section>

          {/* Account Settings Section */}
          <section className="account-section" style={styles.accountSection}>
            <h2 style={styles.sectionTitle}>Account Settings</h2>
            <div style={styles.settingsActions}>
              <button 
                style={{
                  ...styles.btnSetting,
                  ...(hoveredButton === 'password' ? styles.btnSettingHover : {})
                }}
                onMouseEnter={() => setHoveredButton('password')}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={handleChangePassword}
              >
                <span style={styles.icon}>🔒</span>
                Change Password
              </button>
              <button 
                style={{
                  ...styles.btnSetting,
                  ...(hoveredButton === 'logout' ? styles.btnSettingHoverLogout : {})
                }}
                onMouseEnter={() => setHoveredButton('logout')}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={handleLogout}
              >
                <span style={styles.icon}>🚪</span>
                Logout
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* ALL MODALS - Confirmation, Order Details, Profile, Address, Password, Payment */}
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div style={styles.modalOverlay} onClick={() => setShowConfirmModal(false)}>
          <div style={styles.confirmModalContent} onClick={(e) => e.stopPropagation()}>
            <span style={styles.confirmIcon}>{getConfirmIcon(confirmModalData.type)}</span>
            <h2 style={styles.confirmTitle}>{confirmModalData.title}</h2>
            <p style={styles.confirmMessage}>{confirmModalData.message}</p>
            <div style={styles.confirmActions}>
              <button style={styles.btnCancel} onClick={() => setShowConfirmModal(false)}>
                Cancel
              </button>
              <button 
                style={{
                  ...styles.btnConfirm,
                  ...(confirmModalData.type === 'delete' || confirmModalData.type === 'remove' || confirmModalData.type === 'logout' 
                    ? styles.btnConfirmDelete : {})
                }}
                onClick={handleConfirmAction}
              >
                {confirmModalData.type === 'delete' || confirmModalData.type === 'remove' ? 'Delete' : confirmModalData.type === 'logout' ? 'Logout' : 'OK'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderDetailsModal && selectedOrder && (
        <div style={styles.modalOverlay} onClick={() => setShowOrderDetailsModal(false)}>
          <div style={styles.orderDetailsContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalHeader}>Order Details</h2>
            <img src={selectedOrder.image} alt={selectedOrder.name} style={styles.orderDetailImage} />
            <div style={styles.orderDetailRow}>
              <span style={styles.orderDetailLabel}>Product Name</span>
              <span style={styles.orderDetailValue}>{selectedOrder.name}</span>
            </div>
            <div style={styles.orderDetailRow}>
              <span style={styles.orderDetailLabel}>Price</span>
              <span style={styles.orderDetailValue}>₹{selectedOrder.price}</span>
            </div>
            <div style={styles.orderDetailRow}>
              <span style={styles.orderDetailLabel}>Status</span>
              <span style={styles.orderDetailValue}>{selectedOrder.status}</span>
            </div>
            <div style={styles.orderDetailRow}>
              <span style={styles.orderDetailLabel}>Order Date</span>
              <span style={styles.orderDetailValue}>{selectedOrder.date}</span>
            </div>
            <div style={styles.orderDetailRow}>
              <span style={styles.orderDetailLabel}>Order ID</span>
              <span style={styles.orderDetailValue}>#{selectedOrder.id}234567</span>
            </div>
            <div style={styles.modalActions}>
              <button style={styles.btnPrimary} onClick={() => setShowOrderDetailsModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showProfileModal && (
        <div style={styles.modalOverlay} onClick={() => setShowProfileModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalHeader}>Edit Profile</h2>
            <form onSubmit={handleSaveProfile}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  style={styles.input}
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  style={styles.input}
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone</label>
                <input
                  type="tel"
                  style={styles.input}
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                  required
                />
              </div>
              <div style={styles.modalActions}>
                <button type="button" style={styles.btnCancel} onClick={() => setShowProfileModal(false)}>
                  Cancel
                </button>
                <button type="submit" style={styles.btnPrimary}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Address Modal */}
      {showAddressModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddressModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalHeader}>{editingAddress ? 'Edit Address' : 'Add New Address'}</h2>
            <form onSubmit={handleSaveAddress}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Address Type</label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="e.g., Home, Office, Other"
                  value={addressForm.type}
                  onChange={(e) => setAddressForm({...addressForm, type: e.target.value})}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Address</label>
                <textarea
                  style={styles.textarea}
                  placeholder="Enter complete address with pincode"
                  value={addressForm.address}
                  onChange={(e) => setAddressForm({...addressForm, address: e.target.value})}
                  required
                />
              </div>
              <div style={styles.modalActions}>
                <button type="button" style={styles.btnCancel} onClick={() => setShowAddressModal(false)}>
                  Cancel
                </button>
                <button type="submit" style={styles.btnPrimary}>
                  {editingAddress ? 'Update' : 'Add'} Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div style={styles.modalOverlay} onClick={() => setShowPasswordModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalHeader}>Change Password</h2>
            <form onSubmit={handleSavePassword}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Current Password</label>
                <input
                  type="password"
                  style={styles.input}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>New Password</label>
                <input
                  type="password"
                  style={styles.input}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                  required
                  minLength="6"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Confirm New Password</label>
                <input
                  type="password"
                  style={styles.input}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                  required
                  minLength="6"
                />
              </div>
              <div style={styles.modalActions}>
                <button type="button" style={styles.btnCancel} onClick={() => setShowPasswordModal(false)}>
                  Cancel
                </button>
                <button type="submit" style={styles.btnPrimary}>
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Method Selector Modal */}
      {showPaymentMethodSelector && (
        <div style={styles.modalOverlay} onClick={() => setShowPaymentMethodSelector(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalHeader}>Select Payment Method</h2>
            <div style={styles.paymentMethodGrid}>
              {paymentMethodTypes.map((method) => (
                <div
                  key={method.id}
                  style={{
                    ...styles.paymentMethodCard,
                    ...(hoveredCard === method.id ? styles.paymentMethodCardHover : {})
                  }}
                  onMouseEnter={() => setHoveredCard(method.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleSelectPaymentType(method.id)}
                >
                  <div style={styles.paymentMethodIcon}>{method.icon}</div>
                  <div style={styles.paymentMethodName}>{method.name}</div>
                  <div style={styles.paymentMethodDesc}>{method.description}</div>
                </div>
              ))}
            </div>
            <div style={styles.modalActions}>
              <button type="button" style={styles.btnCancel} onClick={() => setShowPaymentMethodSelector(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Form Modal */}
      {showPaymentFormModal && (
        <div style={styles.modalOverlay} onClick={() => setShowPaymentFormModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalHeader}>
              Add {paymentMethodTypes.find(m => m.id === selectedPaymentType)?.name}
            </h2>
            <form onSubmit={handleSavePaymentMethod}>
              {(selectedPaymentType === 'creditCard' || selectedPaymentType === 'debitCard') && (
                <>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Card Number</label>
                    <input
                      type="text"
                      style={styles.input}
                      placeholder="1234 5678 9012 3456"
                      value={paymentForm.cardNumber}
                      onChange={(e) => setPaymentForm({...paymentForm, cardNumber: e.target.value})}
                      maxLength="16"
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Card Holder Name</label>
                    <input
                      type="text"
                      style={styles.input}
                      placeholder="John Doe"
                      value={paymentForm.cardHolder}
                      onChange={(e) => setPaymentForm({...paymentForm, cardHolder: e.target.value})}
                      required
                    />
                  </div>
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Expiry Date</label>
                      <input
                        type="text"
                        style={styles.input}
                        placeholder="MM/YY"
                        value={paymentForm.expiryDate}
                        onChange={(e) => setPaymentForm({...paymentForm, expiryDate: e.target.value})}
                        maxLength="5"
                        required
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>CVV</label>
                      <input
                        type="password"
                        style={styles.input}
                        placeholder="123"
                        value={paymentForm.cvv}
                        onChange={(e) => setPaymentForm({...paymentForm, cvv: e.target.value})}
                        maxLength="3"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {selectedPaymentType === 'upi' && (
                <div style={styles.formGroup}>
                  <label style={styles.label}>UPI ID</label>
                  <input
                    type="text"
                    style={styles.input}
                    placeholder="yourname@upi"
                    value={paymentForm.upiId}
                    onChange={(e) => setPaymentForm({...paymentForm, upiId: e.target.value})}
                    required
                  />
                </div>
              )}

              {selectedPaymentType === 'netBanking' && (
                <>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Bank Name</label>
                    <select
                      style={styles.select}
                      value={paymentForm.bankName}
                      onChange={(e) => setPaymentForm({...paymentForm, bankName: e.target.value})}
                      required
                    >
                      <option value="">Select Bank</option>
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="SBI">State Bank of India</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra">Kotak Mahindra</option>
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Account Number</label>
                    <input
                      type="text"
                      style={styles.input}
                      placeholder="Enter account number"
                      value={paymentForm.accountNumber}
                      onChange={(e) => setPaymentForm({...paymentForm, accountNumber: e.target.value})}
                      required
                    />
                  </div>
                </>
              )}

              {selectedPaymentType === 'wallet' && (
                <>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Wallet Type</label>
                    <select
                      style={styles.select}
                      value={paymentForm.walletType}
                      onChange={(e) => setPaymentForm({...paymentForm, walletType: e.target.value})}
                      required
                    >
                      <option value="">Select Wallet</option>
                      <option value="PayPal">PayPal</option>
                      <option value="Amazon Pay">Amazon Pay</option>
                      <option value="Google Pay">Google Pay</option>
                      <option value="PhonePe">PhonePe</option>
                      <option value="Paytm">Paytm</option>
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Mobile Number</label>
                    <input
                      type="tel"
                      style={styles.input}
                      placeholder="+91 98765 43210"
                      value={paymentForm.mobileNumber}
                      onChange={(e) => setPaymentForm({...paymentForm, mobileNumber: e.target.value})}
                      required
                    />
                  </div>
                </>
              )}

              {selectedPaymentType === 'cod' && (
                <div style={styles.formGroup}>
                  <p style={{color: '#5c544b', fontSize: '15px', lineHeight: '1.6'}}>
                    Cash on Delivery: Pay when your order is delivered to your doorstep.
                  </p>
                </div>
              )}

              <div style={styles.modalActions}>
                <button type="button" style={styles.btnCancel} onClick={() => setShowPaymentFormModal(false)}>
                  Cancel
                </button>
                <button type="submit" style={styles.btnPrimary}>
                  Save Payment Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
