'use strict';

/**
 * CLIENT
 */

// Main
exports.CLRP = require('./client/clrp');

/**
 * EVENTS
 */

// Message
exports.MessageHandler = require('./events/message/messageHandler');
exports.CooldownHandler = require('./events/message/cooldownHandler');

// Interaction
exports.InteractionHandler = require('./events/interaction/interactionHandler');

/**
 * EMBEDS
 */

// Boolean
exports.SuccessEmbed = require('./embeds/successEmbed');
exports.FailEmbed = require('./embeds/failEmbed');
