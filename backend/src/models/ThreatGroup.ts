import mongoose from "mongoose";

const threatGroupSchema = new mongoose.Schema(
{
      canonicalName: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          index: true    
      },

      aliases: [{
          name: {         
              type: String,
              required: true,
              trim: true
          },
          source: {      
              type: String,
              trim: true
          }
      }],

      externalIds: [{
          source: {
              type: String,
              required: true,  
              trim: true
          },
          id: {           
              type: String,
              required: true,
              trim: true
          }
      }],

      tags: [{
          type: String,
          trim: true,     
          lowercase: true
      }],

      description: {     
          type: String,
          required: true,
          trim: true
      },

      country: {        
          type: String,
          trim: true
      },

      status: {
          type: String,
          required: true,
          enum: ['active', 'inactive', 'outdated', 'unknown'],
          default: 'active'
      },

      parentNames: [{
          type: String,
          ref: 'ThreatGroup'
      }],

      childNames: [{
          type: String,
          ref: 'ThreatGroup'
      }],

      sources: [{
          source: {
              type: String,
              required: true,
              trim: true
          },
          url: {
              type: String,
              trim: true
          },
          note: {
              type: String,
              trim: true
          },
          addedAt: {
              type: Date,
              default: Date.now
          }
      }],

      notes: [{
          text: {
              type: String,
              required: true,
              trim: true
          },
          author: {
              type: String,
              required: true,
              trim: true
          },
          createdAt: {
              type: Date,
              default: Date.now
          }
      }]
  },
  { timestamps: true }
  );

const ThreatGroup = mongoose.model("ThreatGroup", threatGroupSchema)

export default ThreatGroup;
